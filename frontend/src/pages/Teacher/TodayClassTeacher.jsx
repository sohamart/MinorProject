import React from 'react'

const TodayClassTeacher = () => {
  const { classes = [] } = useContext(ClassContextData) || {};
 
   console.log(classes)
 
   return (
     <div className='relative text-white h-full w-full lg:bg-black/5 bg-white/5 flex flex-col items-center border border-white/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'>
       
       <div className='lg:w-120  h-18 w-50 lg:h-20 bg-white/10 border-b border-white/40 border-r border-l shadow-inner rounded-2xl mt-2 flex items-center justify-center'>
         <h1 className='lg:text-3xl uppercase font-bold'>Today Classes</h1>
       </div>
 
 
       <div className='shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md h-full pt-15 w-full overflow-auto pb-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]'>
           <div className=' overflow-y-auto p-4 flex flex-col lg:flex-row justify-center items-center  lg:flex-wrap gap-5'>
         
         {classes.length === 0 ? (
           <p className='text-center text-gray-300'>No classes today</p>
         ) : (
           classes.map((cls) => (
             <div 
               key={cls._id}
               className='w-full lg:w-120 bg-white/10 border border-white/20 rounded-lg p-3 flex justify-between items-center'
             >
               <div>
                 <h2 className='font-bold'>{cls.subject}</h2>
                 <p className='text-sm text-gray-300'>{cls.teacher}</p>
                 <p className='text-xs'>{cls.time}</p>
               </div>
 
               <span className={`px-3 py-1 flex justify-center items-center h-8 uppercase  rounded-full text-xs font-semibold 
                 ${cls.type === "lab" ? "bg-green-500/20 border border-green-500/50" : "bg-blue-500/20 border border-blue-500/50"}`}>
                 {cls.type}
               </span>
             </div>
             
           ))
         )}
         
 
       </div>
       </div>
       
 
     </div>
   )
}

export default TodayClassTeacher
