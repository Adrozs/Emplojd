import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FaCalendarDays } from 'react-icons/fa6';

const DatePick = () => {
	const [startdate, setStartDate] = useState(new Date());
	const [enddate, setEndDate] = useState(new Date());

	return (
		<div>
			<div className="flex justify-center">
				<label>
					<div className=" items-center p-1">
						<div className="relative flex items-center text-gray-400">
							<ReactDatePicker
								selected={startdate}
								onChange={(date) => setStartDate(date)}
								className="rounded-xl border-2 flex-grow out-sky800 hover:border-gray-400 px-4 py-2"
							/>
							<FaCalendarDays className="right-9  relative" />
						</div>
					</div>
				</label>

				<label>
					<div className="p-1 text-gray-400">
						<ReactDatePicker
							selected={enddate}
							onChange={(date) => setEndDate(date)}
							className="rounded-xl border-2 flex-grow out-sky800 hover:border-gray-400 px-4 py-2"
						/>
						<FaCalendarDays className=" left-40 -top-7 relative" />
					</div>
				</label>
			</div>
		</div>
	);
};

export default DatePick;
