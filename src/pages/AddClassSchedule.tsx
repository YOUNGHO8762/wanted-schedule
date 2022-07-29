import { useState } from 'react';
import { DAYS, SCHEDULES_API } from '../constant/constants';
import { Class, Days, Meridiem } from '../interfaces/types';
import styled from 'styled-components';
import Title from '../components/common/Title';
import ClickButton from '../components/common/ClickButton';
import SelectButton from '../components/common//SelectButton';
import { useNavigate } from 'react-router-dom';
import { calculateEndTime, compareTime, convertTimeToNumber } from '../utils/util';

export default function AddClassSchedule() {
  const [time, setTime] = useState({ hour: '00', minute: '00', meridiem: 'AM' });
  const [days, setDays] = useState<Days[]>([]);

  const navigate = useNavigate();

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTime({ ...time, [event.target.id]: event.target.value });
  };

  const checkIncludeDays = (enteredDay: Days) => {
    const isInclude = days.includes(enteredDay);
    return isInclude;
  };

  const handleDayDelete = (enteredDay: Days) => {
    const filteredDays = days.filter((day) => {
      return day !== enteredDay;
    });

    setDays(filteredDays);
  };

  const handleDayClick = (clickedDay: Days) => {
    if (checkIncludeDays(clickedDay)) {
      handleDayDelete(clickedDay);
      return;
    }
    setDays([...days, clickedDay]);
  };

  const handleMeridiemClick = (enteredMeridiem: Meridiem) => {
    setTime({ ...time, meridiem: enteredMeridiem });
  };

  const checkSchedule = async (day: Days, enteredStartTime: string) => {
    let result = false;
    await fetch(`${SCHEDULES_API}?day=${day}`)
      .then((response) => response.json())
      .then((json) => {
        const currentStartTimes = json.map((data: Class) => data.startTime);
        const includeEnteredStartTimes = [...currentStartTimes, enteredStartTime];
        const sortedStartTimes = includeEnteredStartTimes.sort(compareTime);
        const enteredStartTimeIndex = sortedStartTimes.indexOf(enteredStartTime);

        if (
          sortedStartTimes[enteredStartTimeIndex - 1] === enteredStartTime ||
          sortedStartTimes[enteredStartTimeIndex + 1] === enteredStartTime
        ) {
          result = true;
          return;
        }
        if (sortedStartTimes[enteredStartTimeIndex - 1]) {
          if (
            convertTimeToNumber(calculateEndTime(sortedStartTimes[enteredStartTimeIndex - 1])) >
            convertTimeToNumber(enteredStartTime)
          ) {
            result = true;
            return;
          }
        }
        if (sortedStartTimes[enteredStartTimeIndex + 1]) {
          if (
            convertTimeToNumber(sortedStartTimes[enteredStartTimeIndex - 1]) <
            convertTimeToNumber(calculateEndTime(enteredStartTime))
          ) {
            result = true;
            return;
          }
        }
      });
    return result;
  };

  const handleSubmit = async () => {
    if (!days.length) {
      alert('값을 선택해주세요!');
      return;
    }

    if ((time.hour === '11' && time.minute !== '00') || (time.hour === '12' && time.meridiem === 'PM')) {
      alert('23시 까지만 선택이 가능합니다!');
      return;
    }

    const hourTo24 = time.meridiem === 'AM' ? String(+time.hour) : String(+time.hour + 12);
    const startTime = `${hourTo24}:${time.minute}`;

    await Promise.all(
      days.map((day) => {
        checkSchedule(day, startTime).then((response) => {
          if (response) {
            alert(`${day}에 중복되는 시간이 있습니다!`);
            return;
          }
          fetch(SCHEDULES_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              day,
              startTime,
              endTime: calculateEndTime(startTime),
            }),
          });
          navigate('/');
        });
      }),
    );
  };

  const isAMSelected = time.meridiem === 'AM';
  const isPMSelected = time.meridiem === 'PM';

  return (
    <Container>
      <Title>Add class schedule</Title>
      <Contents>
        <div>Start time</div>
        <select id="hour" value={time.hour} onChange={(event) => handleTimeChange(event)}>
          <option value="00">00</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        :
        <select id="minute" value={time.minute} onChange={(event) => handleTimeChange(event)}>
          <option value="00">00</option>
          <option value="05">05</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
        </select>
        <SelectButton isSelected={isAMSelected} onClick={() => handleMeridiemClick('AM')}>
          AM
        </SelectButton>
        <SelectButton isSelected={isPMSelected} onClick={() => handleMeridiemClick('PM')}>
          PM
        </SelectButton>
        <div>Repeat on</div>
        {DAYS.map((day, index) => (
          <SelectButton key={index} isSelected={checkIncludeDays(day)} onClick={() => handleDayClick(day)}>
            {day}
          </SelectButton>
        ))}
      </Contents>
      <ClickButton onClick={handleSubmit}>Save</ClickButton>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 1rem;
`;

const Contents = styled.div`
  background-color: white;
`;
