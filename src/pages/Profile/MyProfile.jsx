import React, { useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";

function MyProfile() {
    const [AnswerData, setAnswerData] = useState([
        { question: 'FRÅGA 1', answer: 'SVAR, SVAR, SVAR, SVAR' },
        { question: 'FRÅGA 2', answer: 'SVAR, SVAR, SVAR, SVAR' },
        { question: 'FRÅGA 3', answer: 'SVAR, SVAR, SVAR, SVAR' },
        { question: 'FRÅGA 4', answer: 'SVAR, SVAR, SVAR, SVAR' },
        { question: 'FRÅGA 5', answer: 'SVAR, SVAR, SVAR, SVAR' }
      ]);
    
      const updateAnswer = (index, newAnswer) => {
        const updatedQaData = [...AnswerData];
        updatedQaData[index].answer = newAnswer;
        setAnswerData(updatedQaData);
      };

  return (
    <>
      <HeaderOtherPages />
      <div
        className="flex flex-col min-h-screen gap-2 m-4"
        style={{ minHeight: "calc(100vh - 170px)" }}
      >
        <div className="flex bg-stone-300 h-12 items-center p-4 w-64 mb-4">
          MIN JOBBPROFIL
        </div>
        <div className="grid grid-col-2 mb-8 gap-2">
            <div className="bg-stone-300 size-36 rounded-full col-start-1 row-span-4"></div>
            <div className="bg-stone-300 h-8 w-48 col-start-2 pl-2 items-center flex">NAMN</div>
            <div className="bg-stone-300 h-8 w-48 col-start-2 pl-2 items-center flex">TELEFON</div>
            <div className="bg-stone-300 h-8 w-48 col-start-2 pl-2 items-center flex">ADRESS</div>
            <div className="bg-stone-300 h-8 w-48 col-start-2 pl-2 items-center flex">EMAIL</div>
        </div>
        <div className="flex bg-stone-300 h-8 items-center p-4 w-48 mb-4">
          OM MIG
        </div>
        <div>
      {AnswerData.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="bg-stone-300 p-2 w-56 h-8 flex items-center mb-4">{item.question}</div>
          <div className="bg-stone-300 p-2 w-full h-20 flex items-center">
            <input 
              className="bg-transparent outline-none w-full h-full"
              type="text"
              value={item.answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
      </div>
    </>
  );
}

export default MyProfile;
