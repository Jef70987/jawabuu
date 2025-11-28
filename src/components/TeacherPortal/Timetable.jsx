import React from "react";

const Timetable = () => {
    const TimetableData = {
        sessions: [
            {id: 1, code: "M", name: "morning"},
            {id: 2, code: "b1", name: "Break"},
            {id: 3, code: "N1", name: "Noon1"},
            {id: 4, code: "b2", name: "Break2"},
            {id: 5, code: "N2", name: "Noon2"},
            {id: 6, code: "L", name: "Lunch"},
            {id: 7, code: "AN", name: "AfterNoon"},
            {id: 8, code: "B3", name: "End"}
        ],

        TimeData: [
            {id: 1, time: "8:00 Am - 8:40 Am"},
            {id: 2, time: "8:40 Am - 9:20 Am"},
            {id: 3, time: "9:20 Am - 10:00 Am"},
            {id: 12, time: ""},
            {id: 4, time: "10:40 Am - 11:20 Am"},
            {id: 5, time: "11:20 Am - 11:40 Am"},
            {id: 12, time: ""},
            {id: 6, time: "11:40 Am - 12:20 Pm"},
            {id: 7, time: "12:20 Pm - 1:20 Pm"},
            {id: 12, time: ""},
            {id: 8, time: "2:00 Pm - 2:40 Pm"},
            {id: 9, time: "2:40 Pm - 3:20 Pm"},
            {id: 10, time: "3:20 Pm- 4:00 Pm"},
            {id: 11, time: "4:00 Pm - 4:30 Pm"},
        ],
        Days: [
            {id: 1, day: "monday", subject1: "Math", subject2: "Eng", subject3: "Biology", subject12: "break", subject4: "History", subject5: "Chemistry", subject6: "P.E", subject7: "Agric", subject8: "Biology", subject9: "Geography", subject10: "Home science", subject11: "Games"},
            {id: 2, day: "Tuesday", subject1: "Chemistry", subject2: "Biology", subject3: "Math", subject12: "break", subject4: "Eng", subject5: "Math", subject6: "Math", subject7: "Math", subject8: "Math", subject9: "Math", subject10: "Biology", subject11: "Clubs"},
            {id: 3, day: "Wednesday", subject1: "Kiswahili", subject2: "Math", subject3: "Eng", subject12: "break", subject4: "C.R.E", subject5: "Physics", subject6: "Agric", subject7: "P.E", subject8: "Chemistry", subject9: "Biology", subject10: "History", subject11: "Games"},
            {id: 4, day: "Thursday", subject1: "Math", subject2: "Math", subject3: "Chemistry", subject12: "break", subject4: "Eng", subject5: "Kiswahili", subject6: "Geography", subject7: "Biology", subject8: "History", subject9: "Home Science", subject10: "Comp Studies", subject11: "Cleaning"},
            {id: 5, day: "Friday", subject1: "Math", subject2: "Math", subject3: "Math", subject12: "break", subject4: "Math", subject5: "Math", subject6: "Math", subject7: "Math", subject8: "Math", subject9: "Math", subject10: "Math", subject11: "Games"},
            {id: 6, day: "saturday", subject1: "Math", subject2: "Math", subject3: "Math", subject12: "break", subject4: "Math", subject5: "Math", subject6: "Math", subject7: "Math", subject8: "Math", subject9: "Math", subject10: "Math", subject11: "Group Discussion"},
        ],
        Events: [
            {id: 1, Day: "Mon"},
        ]
    };

    return (
        <div className="flex-1 bg-gray-50 text-gray-800 overflow-hidden flex flex-col max-h-screen">
            {/* Main Content Area with Scroll (hidden scrollbar) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden max-h-full">
                <div className="w-full max-w-full">
                    {/* Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 md:py-6 mb-6 border-b border-gray-200">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Timetable</h1>
                            <p className="text-gray-600">Grade 10 - Term 1 Schedule</p>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                Print Timetable
                            </button>
                        </div>
                    </header>

                    {/* Mobile View - Vertical Cards */}
                    <div className="block lg:hidden space-y-4 mb-6">
                        {TimetableData.Days.map((Day) => (
                            <div key={Day.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                <div className="bg-red-600 text-white rounded-lg p-3 mb-3">
                                    <h3 className="font-bold text-lg text-center">{Day.day}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">8:00-8:40</span>
                                        <p className="text-gray-600">{Day.subject1}</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">8:40-9:20</span>
                                        <p className="text-gray-600">{Day.subject2}</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">9:20-10:00</span>
                                        <p className="text-gray-600">{Day.subject3}</p>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded border border-green-200">
                                        <span className="font-medium text-gray-700">10:00-10:40</span>
                                        <p className="text-green-700 italic">Tea Break</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">10:40-11:20</span>
                                        <p className="text-gray-600">{Day.subject4}</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">11:20-11:40</span>
                                        <p className="text-gray-600">{Day.subject5}</p>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded border border-green-200">
                                        <span className="font-medium text-gray-700">11:40-12:00</span>
                                        <p className="text-green-700 italic">Short Break</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">12:20-1:20</span>
                                        <p className="text-gray-600">{Day.subject7}</p>
                                    </div>
                                    <div className="bg-green-100 p-2 rounded border border-green-200 col-span-2">
                                        <span className="font-medium text-gray-700">1:20-2:00</span>
                                        <p className="text-green-700 italic">Lunch Break</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">2:00-2:40</span>
                                        <p className="text-gray-600">{Day.subject8}</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">2:40-3:20</span>
                                        <p className="text-gray-600">{Day.subject9}</p>
                                    </div>
                                    <div className="bg-sky-50 p-2 rounded border border-sky-200">
                                        <span className="font-medium text-gray-700">3:20-4:00</span>
                                        <p className="text-gray-600">{Day.subject10}</p>
                                    </div>
                                    <div className="bg-red-50 p-2 rounded border border-red-200 col-span-2">
                                        <span className="font-medium text-gray-700">4:00-4:30</span>
                                        <p className="text-red-700 font-medium">{Day.subject11}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View - Full Timetable Table */}
                    <div className="hidden lg:block bg-white rounded-xl shadow-sm border-2 border-red-500 p-6 mb-8">
                        <table className="w-full min-h-[300px] h-fit">
                            {/* Title Row */}
                            <thead>
                                <tr>
                                    <th 
                                        colSpan={TimetableData.TimeData.length + 1} 
                                        className="text-center py-4 text-xl font-bold bg-red-600 text-white rounded-t-lg"
                                    >
                                        Term 1 Timetable Grade 10
                                    </th>
                                </tr>
                            </thead>
                            
                            {/* Time Header Row */}
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="p-3 font-medium w-24 text-sm">Days/Time</th>
                                    {TimetableData.TimeData.map((TimeData) => (
                                        <th 
                                            key={TimeData.id} 
                                            className="p-2 font-normal w-20 h-24 relative bg-black"
                                        >
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] text-white">
                                                {TimeData.time}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            
                            {/* Days and Subjects Rows */}
                            <tbody>
                                {TimetableData.Days.map((Day, index) => (
                                    <tr 
                                        key={Day.id} 
                                        className={`border-t border-gray-300 hover:bg-gray-50 ${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                    >
                                        {/* Day Column */}
                                        <th className="bg-red-600 text-white text-sm p-3 font-bold text-left w-24">
                                            {Day.day}
                                        </th>
                                        
                                        {/* Subject Columns */}
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject1}
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject2}
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject3}
                                            </div>
                                        </td>
                                        {/* Tea Break */}
                                        <td className="bg-green-100 border border-green-200 p-2 w-20 h-16 relative">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[13px] w-32 italic text-green-700 font-medium">
                                                Tea Break
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject4}
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject5}
                                            </div>
                                        </td>
                                        {/* Short Break */}
                                        <td className="bg-green-100 border border-green-200 p-2 w-20 h-16 relative">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[13px] w-32 italic text-green-700 font-medium">
                                                Short Break
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject6}
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject7}
                                            </div>
                                        </td>
                                        {/* Lunch Break */}
                                        <td className="bg-green-100 border border-green-200 p-2 w-20 h-16 relative">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[13px] w-32 italic text-green-700 font-medium">
                                                Lunch Break
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject8}
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject9}
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 p-2 w-20 h-16 relative bg-white">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[10px] w-32 font-medium text-gray-800">
                                                {Day.subject10}
                                            </div>
                                        </td>
                                        {/* End of Day Activity */}
                                        <td className="bg-red-100 border border-red-200 p-2 w-20 h-16 relative">
                                            <div className="absolute transform -rotate-40 origin-left-center whitespace-nowrap text-[13px] w-32 font-medium text-red-700">
                                                {Day.subject11}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Legend and Additional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Color Legend */}
                        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                                Color Legend
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 bg-red-600 text-white rounded">
                                    <span className="text-sm font-medium">Day Headers</span>
                                    <span className="text-xs">Red</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-black text-white rounded">
                                    <span className="text-sm font-medium">Time Headers</span>
                                    <span className="text-xs">Black</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-green-100 text-green-800 rounded border border-green-200">
                                    <span className="text-sm font-medium">Break Times</span>
                                    <span className="text-xs">Green</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-sky-50 text-gray-800 rounded border border-sky-200">
                                    <span className="text-sm font-medium">Regular Classes</span>
                                    <span className="text-xs">Sky Blue</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white text-gray-800 rounded border border-gray-300">
                                    <span className="text-sm font-medium">Subject Cells</span>
                                    <span className="text-xs">White</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Notes */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Timetable Notes</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    All classes are 40 minutes unless specified
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    Break times: Tea (20min), Short Break (20min), Lunch (60min)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    Friday includes extended games period
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    Saturday schedule for special activities
                                </li>
                                <li className="flex items-start">
                                    <span className="text-red-600 mr-2">•</span>
                                    Subject teachers are assigned per class schedule
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Current Week Events */}
                    <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">This Week's Special Events</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-red-300 rounded-lg p-4 bg-red-50 hover:border-red-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-gray-800">Monday</span>
                                    <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                        Today
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">Regular schedule</p>
                            </div>
                            
                            <div className="border border-sky-300 rounded-lg p-4 bg-sky-50 hover:border-sky-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-gray-800">Wednesday</span>
                                    <span className="bg-sky-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                        Science Lab
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">Extended Chemistry practical</p>
                            </div>
                            
                            <div className="border border-red-300 rounded-lg p-4 bg-red-50 hover:border-red-500 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-gray-800">Friday</span>
                                    <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                        Sports Day
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">Inter-class Games Competition</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timetable;