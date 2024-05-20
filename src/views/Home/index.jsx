import React, { useEffect, useState } from 'react';
import './style.css';
import { getAppointment } from '../../config/firebase';

function Home() {

  const [activeAppointments, setActiveAppointments] = useState([]);

  useEffect(() => {
    getActiveAppointments();
  }, []);

  const getActiveAppointments = async () => {
    try {
      const appointments = await getAppointment();

      const appointmentsArr = [];

      appointments.forEach(element => {
        appointmentsArr.push({...element.data(), id: element.id});
      });

      appointmentsArr.forEach(element => {
        const appointmentDateObj = new Date(element.date);

        const appointmentDate = `${appointmentDateObj.getFullYear()}-${appointmentDateObj.getMonth() + 1 < 10 ? "0" + String(appointmentDateObj.getMonth() + 1) : appointmentDateObj.getMonth() + 1}-${appointmentDateObj.getDate() < 10 ? "0" + String(appointmentDateObj.getDate()) : appointmentDateObj.getDate()}`

        element.date = appointmentDate;
      })

      setActiveAppointments(appointmentsArr);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Active reservation</h1>
      <br />
      {activeAppointments.length ?
        <table>
          <tr>
            <th>Time</th>
            <th>Location</th>
            <th>Date</th>
            <th>Ticket Number</th>
          </tr>
          {activeAppointments.map(element => {
            return (
              <tr>
                <td>{element.time}</td>
                <td>{element.location}</td>
                <td>{element.date}</td>
                <td>P-{element.id}</td>
              </tr>
            )
          })}
          
        </table>
        :
         <h1>No appointment</h1>
      }
    </div>
  )
}

export default Home;