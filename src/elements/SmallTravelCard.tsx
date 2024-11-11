import React from 'react';

interface TravelCardProps {
    name: string;
    date: string;
    startLocation: string;
    endLocation: string;
    startTime: string;
    endTime: string;
    cost: number;
}

const SmallTravelCard: React.FC<TravelCardProps> = ({
    name,
    date,
    startLocation,
    endLocation,
    startTime,
    endTime,
    cost,
}) => {

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden w-80 md:w-1/4 mx-auto mt-3 border border-gray-200 p-2 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg ">
            <div className="p-4 flex  justify-between w-full">
                <div className="flex flex-col items-center justify-center mr-4">
                    <p className="text-h1 font-bold text-blue">{date.split(" ")[0]}</p>
                    <p className="text-h1  text-blue">{date.split(" ")[1]}</p>
                </div>
                <div className="flex flex-col justify-start">
                    <div className="flex mb-3 items-center">

                        <div className="flex flex-col justify-between ">
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 border-2 rounded-full border-green mr-2"></div>
                                <p className="text-blue text-p">{startLocation}</p>
                                <p className="text-gray-600 text-p ml-2">{startTime}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green mr-2"></div>
                                <p className="text-blue text-p">{endLocation}</p>
                                <p className="text-gray-600 text-p ml-2">{endTime}</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-between">
                        <p className="text-blue text-p">Costo: ${cost}</p>
                        <p className="ml-2 text-p text-blue">Conductor: {name}</p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default SmallTravelCard;
