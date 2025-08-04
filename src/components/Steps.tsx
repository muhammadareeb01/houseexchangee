'use client';

import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'react-feather';

export interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface StepsProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  className?: string;
}

const Steps = ({ steps, currentStep, onStepChange, className = '' }: StepsProps) => {
  const [showAllSteps, setShowAllSteps] = useState(false);

  const toggleSteps = () => {
    setShowAllSteps(!showAllSteps);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Stappenplan</h2>
          <button
            onClick={toggleSteps}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            type="button"
          >
            {showAllSteps ? 'Toon minder' : 'Toon alle stappen'}
            {showAllSteps ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Steps List */}
      <div className="divide-y divide-gray-200">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isVisible = showAllSteps || isCurrent || isCompleted;

          if (!isVisible) return null;

          return (
            <div
              key={index}
              className={`p-4 transition-colors ${
                isCurrent ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start">
                {/* Step Number/Check Icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3">
                  {isCompleted ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        isCurrent ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-grow">
                  <h3
                    className={`text-sm font-medium ${
                      isCurrent ? 'text-blue-600' : 'text-gray-900'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          <ChevronLeft size={16} className="mr-1" />
          Vorige stap
        </button>
        <button
          onClick={() => onStepChange(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            currentStep === steps.length - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          type="button"
        >
          Volgende stap
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Steps; 