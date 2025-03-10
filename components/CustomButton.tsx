"use client";

import React from 'react'
import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon, isDisabled }: CustomButtonProps) => {
    return (
        <button
            disabled={false}
            type={btnType}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>
                {title}
            </span>
            {rightIcon && (
                <div className="relative size-6">
                    <Image
                        src={rightIcon}
                        alt='right icon'
                        fill
                        className='object-contain'
                    />
                </div>
            )}
        </button >
    )
}

export default CustomButton