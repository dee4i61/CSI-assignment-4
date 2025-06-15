import { Plus, Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { React, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Calendar = () => {
  const { isDark } = useTheme();
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          ...newEvent,
        },
      ]);
      setNewEvent({ title: "", date: "", time: "" });
      setShowAddEvent(false);
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Calendar Events
        </h3>
        <button
          onClick={() => setShowAddEvent(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Event
        </button>
      </div>

      <div
        className={`${
          isDark ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-sm border ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {events.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon
              size={48}
              className={`mx-auto mb-4 ${
                isDark ? "text-gray-400" : "text-gray-300"
              }`}
            />
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No events scheduled. Add your first event to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 border rounded-lg ${
                  isDark
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-200 bg-gray-50"
                } flex justify-between items-center`}
              >
                <div>
                  <h4
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {event.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.date} at {event.time}
                  </p>
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className={`p-2 rounded ${
                    isDark
                      ? "text-red-400 hover:bg-gray-600"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-xl w-96`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Add New Event
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className={`w-full p-3 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddEvent(false)}
                className={`px-4 py-2 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Calendar;