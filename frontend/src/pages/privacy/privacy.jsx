import React from 'react'

import { useNavigate } from "react-router-dom";
import { ArrowLeftFromLine } from 'lucide-react';


const Privacy = () => {
  const navigate = useNavigate();

  const back = () => {
        navigate(-1)
      }
  return (
    <div className="h-screen overflow-y-auto no-scrollbar py-10 px-5">
      
      <div className="max-w-4xl relative mx-auto bg-black/20  border border-white/30 shadow-lg rounded-2xl p-8">
        <div title='Go Back' className='absolute z-12 w-10 h-10  flex justify-center items-center  bg-white/20 border-white/50  border-b-2 rounded-b-2xl top-0 right-2'>
                     <ArrowLeftFromLine 
                     
                     onClick={back}
                     color="#ffffff"
                     className='active:scale-95'/>
      </div>
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Privacy Policy
        </h1>

        <h2 className="text-center text-lg font-semibold text-white mb-2">
          C.R Time Pro Kalna Polytechnic
        </h2>

        <p className="text-white/50 mb-6 text-center">
          Last Updated: May 21, 2026
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Introduction
          </h2>

          <p className="text-white/70 leading-7">
            Welcome to <strong>C.R Time Pro Kalna Polytechnic</strong>. Your
            privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our college
            management application developed for Kalna Polytechnic.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Information We Collect
          </h2>

          <ul className="list-disc pl-6 text-white/70 leading-7">
            <li>Student name and basic profile details</li>
            <li>Class routine and academic schedule information</li>
            <li>Device information for app performance improvement</li>
            <li>Login authentication data (if applicable)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            How We Use Your Information
          </h2>

          <ul className="list-disc pl-6 text-white/70 leading-7">
            <li>To manage class routines and schedules</li>
            <li>To improve app performance and user experience</li>
            <li>To provide important academic updates</li>
            <li>To maintain security and prevent misuse</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Data Security
          </h2>

          <p className="text-white/70 leading-7">
            We take reasonable security measures to protect your data from
            unauthorized access, misuse, or disclosure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Third-Party Services
          </h2>

          <p className="text-white/70 leading-7">
            Our app may use trusted third-party services such as Firebase,
            Google Authentication, or analytics tools to improve functionality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Children's Privacy
          </h2>

          <p className="text-white/70 leading-7">
            C.R Time Pro is intended for educational use by college students and
            does not knowingly collect personal information from children under
            13 years of age.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Changes to This Policy
          </h2>

          <p className="text-white/70 leading-7">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Support & Developer Details
          </h2>

          <div className="bg-white/10 border border-white/50 rounded-xl p-5">
            <p className="text-green-400 leading-7">
              <span className="font-semibold text-white">Developer Name:</span>Minor Project Team of Kalna Polytechnic
            </p>

            <p className="text-blue-700 leading-7">
              <span className="font-semibold text-white">Email:</span>{' '}
              trioentorcode@gmail.com
            </p>

            <p className="text-yellow-400 leading-7">
              <span className="font-semibold text-white">Application Name:</span> C.R Time
              Pro Kalna Polytechnic
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-3">
            Contact Us
          </h2>

          <p className="text-white/70 leading-7">
            If you have any questions regarding this Privacy Policy or need
            support related to the application, please contact the developer via
            the provided email address.
          </p>
        </section>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © 2026 C.R Time Pro Kalna Polytechnic. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}

export default Privacy