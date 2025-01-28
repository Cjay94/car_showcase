import { footerLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">

            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10 ">

                <div className="flex flex-col justify-start items-start gap-6">
                    <Image
                        src='logo.svg'
                        alt='Footer logo'
                        width={118}
                        height={18}
                        className='object-contain'
                    />

                    <p className="text-base text-gray-700">
                        &copy; CarHub {new Date().getFullYear()} <br />
                        All Rights Reserved
                    </p>
                </div>

                <div className="footer__links">

                    {footerLinks.map((link, idx) => (
                        <div
                            key={idx}
                            className="footer__link"
                        >
                            <h3 className="font-bold">
                                {link.title}
                            </h3>

                            {link.links.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.url}
                                    className='text-gray-500 hover:text-primary-blue transition duration-300'
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

            </div>

            <div className="footer__copyrights">
                <p>Designed and Curated by
                    <span className='font-bold ml-1 hover:text-primary-blue cursor-pointer transition duration-300'>
                        {'</CJD>'}
                    </span>
                </p>

                <div className="footer__copyrights-link">
                    <Link href="/" className='text-gray-500 hover:text-primary-blue cursor-pointer transition duration-300'>
                        Privacy & Policy
                    </Link>
                    <Link href="/" className='text-gray-500 hover:text-primary-blue cursor-pointer transition duration-300'>
                        Terms & Conditions
                    </Link>
                </div>

            </div>

        </footer>
    )
}

export default Footer