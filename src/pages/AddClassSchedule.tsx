import { useState } from 'react';
import { DAYS, SCHEDULES_API } from '../constant/constants';
import { Days, Meridiem } from '../interfaces/types';
import styled from 'styled-components';
import Title from '../components/common/Title';
import ClickButton from '../components/common/ClickButton';
import SelectButton from '../components/common//SelectButton';
import { useNavigate } from 'react-router-dom';

export default function AddClassSchedule() {
  const [time, setTime] = useState({ hour: '00', minute: '00', meridiem: 'AM' });
  const [day, setDay] = useState<Days>();
  // const [days, setDays] = useState<Days[]>([]);

  const navigate = useNavigate();

  const handleTimeChange = (event: any) => {
    setTime({ ...time, [event.target.id]: event.target.value });
  };

  const checkIncludeDays = (enteredDay: Days) => {
    // const isInclude = days.includes(day);
    const isInclude = day === enteredDay;
    return isInclude;
  };

  // const handleDayDelete = (enteredDay: Days) => {
  //   const filteredDays = days.filter((day) => {
  //     return day !== enteredDay;
  //   });

  //   setDays(filteredDays);
  // };

  const handleDayClick = (clickedDay: Days) => {
    // if (checkIncludeDays(clickedDay)) {
    //   handleDayDelete(clickedDay);
    //   return;
    // }
    // setDays([...days, clickedDay]);
    setDay(clickedDay);
  };

  const handleMeridiemClick = (enteredMeridiem: Meridiem) => {
    setTime({ ...time, meridiem: enteredMeridiem });
  };

  const handleSubmit = () => {
    const data = {
      day,
      startTime: `${time.hour}:${time.minute}`,
      endTime: `${time.hour}:${time.minute}`,
    };

    fetch(SCHEDULES_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      navigate('/');
    });
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
