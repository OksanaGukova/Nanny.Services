import css from './Appointment.module.css'

export default function Appointment ( { nanny }) {
 

  if (!nanny) return null; // захист, якщо пропси не передалися

  const { avatar_url, name } = nanny;
return <>

<div>
   <div className={css.text}>
        <h1 className={css.header}>Make an appointment with a babysitter</h1>
        <p className={css.txt}>Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.</p>
   </div>
   <div className={css.reviewContainer}>
                   <div className={css.nannyesInfo}>
                    <img className={css.nannyesImg} src={avatar_url} alt="nanny" />
                                            <div>
                                                 <p className={css.nanny}>Your nanny</p>
                                                 <p className={css.nannyesName}>{name}</p>
                                            </div>
                                           </div>
                                             <form className={css.form}>
 <div className={css.labels}>
            <label >
             
              <input className={css.label} type="text" placeholder=" Address" />
            </label>
               <label >
              <input className={css.label}
                type="tel"
                placeholder="+380 "
                pattern="^\+?[0-9\s\-\(\)]{7,}$"
                required
              />
            </label>
             </div>
             <div className={css.labels}>
                  <label >
                 
                  <input className={css.label} type="text" placeholder=" Child's age" />
                </label>
                <label >
                  <input className={css.label} type="time" />
                </label>
    
             </div>
 <div className={css.bigLabels}>
            <label>
             
              <input  className={`${css.label} ${css.labelBig}`} type="email" placeholder=" email" />
            </label>
               <label >
             
              <input className= {`${css.label} ${css.labelBig}`} type="text" placeholder=" Father's or mother's name" />
            </label>
 </div>
        <label>
          <textarea className={css.textarea} placeholder="Write your message here..."></textarea>
        </label>

        <button type="submit" className={css.submitBtn}>Send request</button>
      </form>
                </div>
</div>
</>
}