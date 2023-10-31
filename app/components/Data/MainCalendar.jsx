'use client'
import React, { useState } from 'react'
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CreateTimeSlot from '@/app/components/Modals/CreateTimeSlot'
import EditTimeSlot from '../Modals/EditTimeSlot'

const localizer = momentLocalizer(moment)

const MainCalendar = () => {
  const [showCreateTimeSlotModal, setShowCreateTimeSlotModal] = useState(false)
  const [showEditTimeSlotModal, setShowEditTimeSlotModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState()
  const [events, setEvents] = useState([
    {
      start: new Date(2023, 9, 8, 9, 0),
      end: new Date(2023, 9, 8, 12, 0),
      title: 'Busy',
    },
    {
      start: new Date(2023, 9, 10, 12, 0),
      end: new Date(2023, 9, 10, 15, 0),
      title: 'Not Busy',
    },
    // Add more events as needed
  ])

  const handleCreateTimeSlot = (createdEvent) => {
    // Handle event changes and call the API endpoint
    setCurrentEvent(createdEvent)
    setShowCreateTimeSlotModal(true)
  }

  const handleChangeTimeSlot = (changedEvent) => {
    // Handle event changes and call the API endpoint
    setCurrentEvent(changedEvent)
    setShowEditTimeSlotModal(true)
  }
  const fetchData = async (page = props.params.page) => {
    try {
      setLoading(true)
      const response = await getItems(props.params)
      setData(response?.data?.data[props.params.tab])
      setTotalRows(
        page
          ? response?.data?.data?.total_records
          : response?.data?.data[props.params.tab]?.length,
      )
      setColumns(tablesAttibutes.get(props.params.tab)?.table_columns)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        resizable
        onSelectSlot={(event) => handleCreateTimeSlot(event)}
        onSelectEvent={(event) => handleChangeTimeSlot(event)}
        onEventDrop={handleChangeTimeSlot}
        onEventResize={(event) => handleChangeTimeSlot(event)}
        defaultView="week"
        // showMultiDayTimes
      />
      <CreateTimeSlot
        showCreateTimeSlotModal={showCreateTimeSlotModal}
        setShowCreateTimeSlotModal={setShowCreateTimeSlotModal}
        event={currentEvent}
      />
      <EditTimeSlot
        showEditTimeSlotModal={showEditTimeSlotModal}
        setShowEditTimeSlotModal={setShowEditTimeSlotModal}
        event={currentEvent}
      />
    </>
  )
}

export default MainCalendar
