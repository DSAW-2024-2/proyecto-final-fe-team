import React from 'react';

interface TravelCardProps {
    name: string;
    date: string;
    startLocation: string;
    endLocation: string;
    startTime: string;
    endTime: string;
    cost: number;
    color: string;
}

const SmallTravelCardText: React.FC<TravelCardProps> = ({
    name,
    date,
    startLocation,
    endLocation,
    startTime,
    endTime,
    cost,
    color,
}) => {

    return (
        <div className="flex flex-col rounded-lg overflow-hidden mx-auto mt-3 w-3/4 ">
            <div className="p-4 flex  justify-between w-full">
                <div className="flex flex-col items-center justify-center mr-4">
                    <p className={`text-h1 font-bold text-${color}`}>{date.split(" ")[0]}</p>
                    <p className={`text-h1 text-${color}`}>{date.split(" ")[1]}</p>
                </div>
                <div className="flex flex-col justify-start">
                    <div className="flex mb-3 items-center">

                        <div className="flex flex-col justify-between ">
                            <div className="flex items-center mb-1">
                                <div className={`w-3 h-3 border-2 rounded-full border-${color} mr-2`}></div>
                                <p className={`text-${color} font-bold text-p`}>{startLocation}</p>
                                <p className={`text-${color} text-p ml-2`}>{startTime}</p>
                            </div>
                            <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full bg-${color} mr-2`}></div>
                                <p className={`text-${color} font-bold text-p`}>{endLocation}</p>
                                <p className={`text-${color} text-p ml-2`}>{endTime}</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-between">
                        <p className={`text-${color} text-p`}> <span className='font-bold'>Costo:</span> ${cost}</p>
                        <p className={`ml-2 text-p text-${color}`}> <span className="font-bold">Conductor:</span> {name}</p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default SmallTravelCardText;
