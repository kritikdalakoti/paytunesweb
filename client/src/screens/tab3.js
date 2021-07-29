import React, { useState,useContext } from 'react'
import styles from '../css/lineitem.module.css'
import { Grid, makeStyles } from '@material-ui/core'
import { BudgetContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '1%'
        //   backgroundColor: grey,
    },
    root1: {
        width: '100%',
        border: 'none',
        //border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        padding: '3%',
        marginBottom: '2%',
        //   margin:'3%',
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
    },
}));


export const Tab3 = ({state}) => {

    const { state1, dispatch1 } = useContext(BudgetContext)
    let {Audiocreative,setAudiocreative,Videocreative,setVideocreative,Displaycreative,setDisplaycreative,
        Audiosize,setAudiosize,Videosize,setVideosize,Displaysize,setDisplaysize,Audiotrackurl,setAudiotrackurl,Videotrackurl,
        setVideotrackurl,Displaytrackurl,setDisplaytrackurl,Audiocategorytype,setAudiocategorytype,Videocategorytype,setVideocategorytype,
        Displaycategorytype,setDisplaycategorytype,AudioFileinp,setAudioFileinp,VideoFileinp,setVideoFileinp,DisplayFileinp,setDisplayFileinp, 
        AudioFileBanner,setAudioFileBanner,VideoFileBanner,setVideoFileBanner,DisplayFileBanner,setDisplayFileBanner
    }=state
    const classes = useStyles()
    
    console.log('audio',AudioFileinp,'Video',VideoFileinp)
    console.log('type',state1.Type)

    const handlevalidation=()=>{

    }

    return (
        <div>
            {state1.Type.map((typ) =>
                <Grid container className={classes.root1} >
                <div class={styles.headingsub}>
                    <h3>What do you want to name your {typ} creative? *</h3>
                </div>
                <input className="input" required value={typ === "Audio" ? Audiocreative : typ === "Video" ? Videocreative : Displaycreative} placeholder="e.g. Client / Product Name - May 2021 - 30s Creative" size="30" onChange={(e) => {
                    typ === "Audio" ? setAudiocreative(e.target.value) : (typ === "Video" ? setVideocreative(e.target.value) : setDisplaycreative(e.target.value))
                }}
                />
                <div className={styles.vftuc}  >
                    <p class={styles.srtey} >Add your {typ} file*</p>
                    <input type="file" id={`${typ}iu`} accept={typ==="Audio"?".wav,.mp3,.m4a":(typ==="Video"?".mkv":".jpg,png")}  hidden  
                    onChange={e => {
                        if (typ === "Audio") {
                            setAudioFileinp(e.target.files[0])                           
                        } else if (typ === "Video") {
                            setVideoFileinp(e.target.files[0])                           
                        } else {
                            setDisplayFileinp(e.target.files[0])
                        }


                    }}
                    // value={typ === "Audio" ? 'Audio file' : typ === "Video" ? "video file" : "Display file"}
                    />
                    <label for={`${typ}iu`} className={styles.fileinp} style={{width:'100%'}} >  { typ==="Audio"?(AudioFileinp? AudioFileinp.name:`Select ${typ} file`):(typ==="Video"?(VideoFileinp? VideoFileinp.name:`Select ${typ} file`):DisplayFileinp? DisplayFileinp.name:`Select ${typ} file`)  }  </label>
                    <p class={styles.srtey}  >Add your Banner</p>
                    <input type="file" id={`${typ}iu1`} hidden accept=".jpg,.png,.gif" onChange={(e)=>{
                        typ === "Audio" ? setAudioFileBanner(e.target.files[0]) : (typ === "Video" ? setVideoFileBanner(e.target.files[0]) : setDisplayFileBanner(e.target.files[0]))
                    }} 
                    />
                    <label for={`${typ}iu1`} className={styles.fileinp}  > { typ==="Audio"?(AudioFileBanner? AudioFileBanner.name:`Select ${typ} Banner`):(typ==="Video"?(VideoFileBanner? VideoFileBanner.name:`Select ${typ} Banner`):DisplayFileBanner? DisplayFileBanner.name:`Select ${typ} Banner`)  } </label>

                </div>

                <div className={styles.vftuc} style={{ marginLeft: '7%' }} >
                    <p className={styles.srtey} >Size </p>
                    <select className={styles.hjkk} required style={{ padding: '10px' }} value={typ === "Audio" ? Audiosize : typ === "Video" ? Videosize : Displaysize} onChange={(e) => {
                        typ === "Audio" ? setAudiosize(e.target.value) : (typ === "Video" ? setVideosize(e.target.value) : setDisplaysize(e.target.value))
                    }
                    }>
                        <option value disabled >Select Size</option>
                        <option >320x50</option>
                    </select>

                    <p className={styles.srtey} > Click Tracker Url </p>
                    <input type="url" size="90" required value={typ === "Audio" ? Audiotrackurl : typ === "Video" ? Videotrackurl : Displaytrackurl} className={styles.normalinp} onChange={(e) => {
                        typ === "Audio" ? setAudiotrackurl(e.target.value) : (typ === "Video" ? setVideotrackurl(e.target.value) : setDisplaytrackurl(e.target.value))
                    }
                    } />
                </div>
                <div className={styles.vftuc} style={{ marginLeft: '7%' }}>
                    <p className={styles.srtey} >Category Type </p>
                    <select className={styles.hjkk} required style={{ padding: '10px' }} value={typ === "Audio" ? Audiocategorytype : typ === "Video" ? Videocategorytype : Displaycategorytype} onChange={(e) => {
                        typ === "Audio" ? setAudiocategorytype(e.target.value) : (typ === "Video" ? setVideocategorytype(e.target.value) : setDisplaycategorytype
                (e.target.value))
                    }
                    } >
                        <option value disabled >Select category</option>
                        <option value="3-D Graphics">3-D Graphics</option>
                        <option value='7-12 Education'>7-12 Education</option>
                        <option value='A.D.D'>A.D.D</option>
                        <option value='Accessories'>Accessories</option>
                        <option value='Adoption'>Adoption</option>
                        <option value='Adult Education'>Adult Education</option>
                        <option value='Adventure Travel'>Adventure Travel</option>
                        <option value='Advertising'>Advertising</option>
                        <option value='Africa'>Africa</option>
                        <option value='Agriculture'>Agriculture</option>
                        <option value='AIDS/HIV'>AIDS/HIV</option>
                        <option value='Air Travel'>Air Travel</option>
                        <option value='Allergies'>Allergies</option>
                        <option value='Alternative Medicines'>Alternative Medicines</option>
                        <option value='Alternative Religions'>Alternative Religions</option>
                        <option value='American Cuisine'>American Cuisine</option>
                        <option value='Animation'>Animation</option>
                        <option value='Antivirus Software'>Antivirus Software</option>
                        <option value='Appartments'>Appartments</option>
                        <option value='Appliances'>Appliances</option>
                        <option value='Aquariams'>Aquariams</option>
                        <option value='Architects'>Architects</option>
                        <option value='Art History'>Art History</option>
                        <option value='Art/Technology'>Art/Technology</option>
                        <option value='Arthritis'>Arthritis</option>
                        <option value='Arts & Crafts'>Arts & Crafts</option>
                        <option value='Arts & Entertainment'>Arts & Entertainment</option>
                        <option value='Asthama '>Asthama </option>
                        <option value='Astrology'>Astrology</option>
                        <option value='Atheism/Agnosticism'>Atheism/Agnosticism</option>
                        <option value='Australia & New Zealand'>Australia & New Zealand</option>
                        <option value='Autism/PDD'>Autism/PDD</option>
                        <option value='Auto Parts'>Auto Parts</option>
                        <option value='Auto Racing'>Auto Racing</option>
                        <option value='Auto Repair'>Auto Repair</option>
                        <option value='Automotive'>Automotive</option>
                        <option value='Babies & Toddlers'>Babies & Toddlers</option>
                        <option value='Barbecues & Grilling'>Barbecues & Grilling</option>
                        <option value='Baseball'>Baseball</option>
                        <option value='Beadwork'>Beadwork</option>
                        <option value='Beauty'>Beauty</option>
                        <option value='Bed & Breakfast'>Bed & Breakfast</option>
                        <option value='Begginning Investing'>Begginning Investing</option>
                        <option value='Bicycling'>Bicycling</option>
                        <option value='Biology'>Biology</option>
                        <option value='Biotech/Biomedical'>Biotech/Biomedical</option>
                        <option value='Bipolar Disorder'>Bipolar Disorder</option>
                        <option value='Birds'>Birds</option>
                        <option value='Birdwatching'>Birdwatching</option>
                        <option value='Board Games/ Puzzles'>Board Games/ Puzzles</option>
                        <option value='Body Art'>Body Art</option>
                        <option value='Bodybuilding'>Bodybuilding</option>
                        <option value='Books & Literature'>Books & Literature</option>
                        <option value='Botany'>Botany</option>
                        <option value='Boxing'>Boxing</option>
                        <option value='Brain Tumour'>Brain Tumour</option>
                        <option value='Buddhism'>Buddhism</option>
                        <option value='Budget Travel'>Budget Travel</option>
                        <option value='Bussines'>Bussines</option>
                        <option value='Business Software'>Business Software</option>
                        <option value='Business Travel'>Business Travel</option>
                        <option value='Buying/Selling Cars'>Buying/Selling Cars</option>
                        <option value='Buying / Selling Homes'>Buying / Selling Homes</option>
                        <option value='By US Locale'>By US Locale</option>
                        <option value='C/C++'>C/C++</option>
                        <option value='Cajun/Creole'>Cajun/Creole</option>
                        <option value='Cameras & Camorders'>Cameras & Camorders</option>
                        <option value='Camping '>Camping </option>
                        <option value='Canada'>Canada</option>
                        <option value='Cancer'>Cancer</option>
                        <option value='Candle & Soap making'>Candle & Soap making </option>
                        <option value='Canoeing/Kayaking'>Canoeing/Kayaking</option>
                        <option value='Car Culture'>Car Culture</option>
                        <option value='Card Games'>Card Games</option>
                        <option value='Career Advice'>Career Advice</option>
                        <option value='Career Planning'>Career Planning</option>
                        <option value='Careers'>Careers</option>
                        <option value='Caribbean'>Caribbean</option>
                        <option value='Catholicism'>Catholicism</option>
                        <option value='Cats'>Cats</option>
                        <option value='Celebrity Fan/Gossip'>Celebrity Fan/Gossip</option>
                        <option value='Cell Phones'>Cell Phones</option>
                        <option value='Certified Pre-Owned'>Certified Pre-Owned</option>
                        <option value='Cheerleading'>Cheerleading</option>
                        <option value='Chemistry'>Chemistry</option>
                        <option value='Chess'>Chess</option>
                        <option value='Chinese Cuisine'>Chinese Cuisine</option>
                        <option value='Cholesterol'>Cholesterol</option>
                        <option value='Christianity'>Christianity</option>
                        <option value='Chronic Fatigue Syndrome'>Chronic Fatigue Syndrome</option>
                        <option value='Chronic Pain'>Chronic Pain</option>
                        <option value='Cigars'>Cigars</option>
                        <option value='Climbing'>Climbing</option>
                        <option value='Clothing'>Clothing</option>
                        <option value='Cocktails/Beer'>Cocktails/Beer</option>
                        <option value='Coffee/Tea'>Coffee/Tea</option>
                        <option value='Cold & Flu'>Cold & Flu</option>
                        <option value='Collecting'>Collecting</option>
                        <option value='College'>College</option>
                        <option value='College Administration'>College Administration</option>
                        <option value='College Life'>College Life</option>
                        <option value='College Books'>College Books</option>
                        <option value='Commentary'>Commentary</option>
                        <option value='Comparison'>Comparison</option>
                        <option value='Computer Certification'>Computer Certification</option>
                        <option value='Computer Networking'>Computer Networking </option>
                        <option value='Computer Peripherals'>Computer Peripherals</option>
                        <option value='Computer Reviews'>Computer Reviews </option>
                        <option value='Construction'>Construction</option>
                        <option value='Contests & Freebies'>Contests & Freebies</option>
                        <option value='Convertible'>Convertible</option>
                        <option value='Copyright Infringement'>Copyright Infringement</option>
                        <option value='Coupe'>Coupe</option>
                        <option value='Couponing'>Couponing</option>
                        <option value='Credit/Debt & Loans'>Credit/Debt & Loans</option>
                        <option value='Cricket'>Cricket</option>
                        <option value='Crossover'>Crossover</option>
                        <option value='Cruises'>Cruises</option>
                        <option value='Cuisine-Specific'>Cuisine-Specific</option>
                        <option value='Data Centers'>Data Centers</option>
                        <option value='Databases'>Databases</option>
                        <option value='Dating'>Dating</option>
                        <option value='Daycare/Pre School'>Daycare/Pre School</option>
                        <option value='Deafness'>Deafness</option>
                        <option value='Dental Care'>Dental Care </option>
                        <option value='Depression'>Depression</option>
                        <option value='Dermatology'>Dermatology</option>
                        <option value='Desktop Publishing'>Desktop Publishing</option>
                        <option value='Desktop Video'>Desktop Video</option>
                        <option value='Desserts & Baking'>Desserts & Baking</option>
                        <option value='Diabetes'>Diabetes</option>
                        <option value='Diesel'>Diesel</option>
                        <option value='Dining Out'>Dining Out </option>
                        <option value='Distance Learning'>Distance Learning </option>
                        <option value='Divorce Support'>Divorce Support</option>
                        <option value='Dogs'>Dogs</option>
                        <option value='Drawing/Sketching'>Drawing/Sketching</option>
                        <option value='Eastern Europe'>Eastern Europe</option>
                        <option value='Education'>Education</option>
                        <option value='Eldercare'>Eldercare</option>
                        <option value='Electric Vehicle'>Electric Vehicle</option>
                        <option value='Email'>Email</option>
                        <option value='Engines'>Engines</option>
                        <option value='English as a 2nd Language'>English as a 2nd Language</option>
                        <option value='Entertaining'>Entertaining</option>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Environment Safety'>Environment Safety</option>
                        <option value='Epilepsy'>Epilepsy</option>
                        <option value='Ethnic Specific'>Ethnic Specific</option>
                        <option value='Europe'>Europe</option>
                        <option value='Exercise'>Exercise</option>
                        <option value='Extreme Graphic/ Explicit Violence'>Extreme Graphic/ Explicit Violence</option>
                        <option value='Family & Parenting'>Family & Parenting</option>
                        <option value='Family Internet'>Family Internet</option>
                        <option value='Fashion'>Fashion</option>
                        <option value='Figure Skating'>Figure Skating</option>
                        <option value='Financial Aid'>Financial Aid</option>
                        <option value='Financial News'>Financial News</option>
                        <option value='Financial Planning'>Financial Planning</option>
                        <option value='Fine Art'>Fine Art</option>
                        <option value='Fly Fishing'>Fly Fishing</option>
                        <option value='Food & Drink'>Food & Drink</option>
                        <option value='Food Allergies'>Food Allergies</option>
                        <option value='Football'>Football</option>
                        <option value='Forestry'>Forestry</option>
                        <option value='France'>France</option>
                        <option value='Freelance Writing'>Freelance Writing</option>
                        <option value='French Cuisine'>French Cuisine</option>
                        <option value='Freshwater Fishing'>Freshwater Fishing </option>
                        <option value='Game & Fish'>Game & Fish</option>
                        <option value='Gardening'>Gardening </option>
                        <option value='Gay Life'>Gay Life</option>
                        <option value='Genealogy'>Genealogy</option>
                        <option value='Geography'>Geography</option>
                        <option value='Geology'>Geology</option>
                        <option value='GERD/Acid Reflux'>GERD/Acid Reflux</option>
                        <option value='Getting Published'>Getting Published</option>
                        <option value='Golf'>Golf</option>
                        <option value='Government'>Government</option>
                        <option value='Graduate School'>Graduate School</option>
                        <option value='Graphics Software'>Graphics Software</option>
                        <option value='Greece'>Greece</option>
                        <option value='Green Solutions'>Green Solutions</option>
                        <option value='Guitar'>Guitar</option>
                        <option value='Hatchback'>Hatchback</option>
                        <option value='Hate Content'>Hate Content</option>
                        <option value='Headaches/Migraines'>Headaches/Migraines</option>
                        <option value='Health & Fitness'>Health & Fitness</option>
                        <option value='Heart Disease'>Heart Disease</option>
                        <option value='Hedge Fund'>Hedge Fund</option>
                        <option value='Herbs for Health'>Herbs for Health</option>
                        <option value='Hinduism'>Hinduism</option>
                        <option value='Hobbies & Intersts'>Hobbies & Intersts</option>
                        <option value='Holistic Healing'>Holistic Healing</option>
                        <option value='Home & Garden'>Home & Garden</option>
                        <option value='Home Recording'>Home Recording</option>
                        <option value='Home Repair'>Home Repair</option>
                        <option value='Home Theater'>Home Theater</option>
                        <option value='Home Video/DVD'>Home Video/DVD</option>
                        <option value='Homeschooling'>Homeschooling</option>
                        <option value='Homework/Studytips'>Homework/Studytips</option>
                        <option value='Honeymoons/Getaways'>Honeymoons/Getaways</option>
                        <option value='Horse Racing'>Horse Racing</option>
                        <option value='Horses'>Horses</option>
                        <option value='Hotels'>Hotels</option>
                        <option value='Human Resources'>Human Resources</option>
                        <option value='Humor'>Humor</option>
                        <option value='Hunting/Shooting'>Hunting/Shooting</option>
                        <option value='Hybrid'>Hybrid</option>
                        <option value='IBS/Crohns Disease'>IBS/Crohn's Disease</option>
                        <option value='Illegal Content'>Illegal Content</option>
                        <option value='Immigration'>Immigration</option>
                        <option value='Incentivized'>Incentivized</option>
                        <option value='Incest/Abuse Support'>Incest/Abuse Support</option>
                        <option value='Incontinence'>Incontinence</option>
                        <option value='Infertility'>Infertility</option>
                        <option value='Inline Skating'>Inline Skating</option>
                        <option value='Insurance'>Insurance</option>
                        <option value='Interior Decorating'>Interior Decorating</option>
                        <option value='International News'>International News</option>
                        <option value='Investing'>Investing</option>
                        <option value='Investors & Patents'>Investors & Patents</option>
                        <option value='Islam'>Islam</option>
                        <option value='Italian Cuisine'>Italian Cuisine</option>
                        <option value='Italy'>Italy</option>
                        <option value='Japan'>Japan</option>
                        <option value='Japanese Cuisine'>Japanese Cuisine</option>
                        <option value='Java'>Java</option>
                        <option value='Javascript'>Javascript</option>
                        <option value='Jewelry'>Jewelry</option>
                        <option value='Jewelry making'>Jewelry making</option>
                        <option value='Job Fairs'>Job Fairs</option>
                        <option value='Job Search'>Job Search</option>
                        <option value='Judaism'>Judaism</option>
                        <option value='K-6 Educators'>K-6 Educators</option>
                        <option value='Landscaping'>Landscaping</option>
                        <option value='Language Learning'>Language Learning</option>
                        <option value='Large Animals'>Large Animals</option>
                        <option value='Latter-Day Saints'>Latter-Day Saints</option>
                        <option value='Law, Govt & Politics'>Law, Gov't & Politics</option>
                        <option value='Legal Issues'>Legal Issues</option>
                        <option value='Local News'>Local News</option>
                        <option value='Logistics'>Logistics</option>
                        <option value='Luxury'>Luxury</option>
                        <option value='Mac Support'>Mac Support</option>
                        <option value='Magic & Illusion'>Magic & Illusion</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='Marriage'>Marriage</option>
                        <option value='Martial Arts'>Martial Arts</option>
                        <option value='Mens Health'>Men's Health</option>
                        <option value='Metals'>Metals</option>
                        <option value='Mexican Cuisine'>Mexican Cuisine</option>
                        <option value='Mexico & Central AAmerica'>Mexico & Central AAmerica</option>
                        <option value='Mini Van'>Mini Van</option>
                        <option value='Motorcycles'>Motorcycles</option>
                        <option value='Mountain Biking'>Mountain Biking</option>
                        <option value='Movies'>Movies</option>
                        <option value='MP3/MIDI'>MP3/MIDI</option>
                        <option value='Music'>Music</option>
                        <option value='Mutual Funds'>Mutual Funds</option>
                        <option value='NASCAR Racing'>NASCAR Racing</option>
                        <option value='National News'>National News</option>
                        <option value='National Parks'>National Parks</option>
                        <option value='Needlework'>Needlework</option>
                        <option value='Net Conferencing'>Net Conferencing</option>
                        <option value='Net For Beginners'>Net For Beginners</option>
                        <option value='Network Security'>Network Security</option>
                        <option value='News'>News</option>
                        <option value='Non Standard Content'>Non Standard Content</option>
                        <option value='Nursing'>Nursing</option>
                        <option value='Nutrition'>Nutrition</option>
                        <option value='Off-Road Vehicles'>Off-Road Vehicles</option>
                        <option value='Olympics'>Olympics</option>
                        <option value='Options'>Options</option>
                        <option value='Orthopedics'>Orthopedics</option>
                        <option value='Pagan/Wiccan'>Pagan/Wiccan</option>
                        <option value='Paintball'>Paintball</option>
                        <option value='Painting'>Painting</option>
                        <option value='Palmtops/PDAs'>Palmtops/PDAs</option>
                        <option value='Panic/Anxiety Disorders'>Panic/Anxiety Disorders</option>
                        <option value='Paranormal Phenomena'>Paranormal Phenomena</option>
                        <option value='Parenting K-6 kids'>Parenting K-6 kids</option>
                        <option value='Parenting Teens'>Parenting Teens</option>
                        <option value='Pc Support'>Pc Support</option>
                        <option value='Pediatrics'>Pediatrics</option>
                        <option value='Performance Vehicles'>Performance Vehicles</option>
                        <option value='Personal Finance'>Personal Finance</option>
                        <option value='Pets'>Pets</option>
                        <option value='Photography'>Photography</option>
                        <option value='Physical Therapy'>Physical Therapy</option>
                        <option value='Physics'>Physics</option>
                        <option value='Pickup'>Pickup</option>
                        <option value='Politics'>Politics</option>
                        <option value='Pornography'>Pornography</option>
                        <option value='Portable'>Portable</option>
                        <option value='Power & Motorcycles'>Power & Motorcycles</option>
                        <option value='Pregnancy'>Pregnancy</option>
                        <option value='Private School'>Private School</option>
                        <option value='Pro Basketball'>Pro Basketball</option>
                        <option value='Pro Ice Hockey'>Pro Ice Hockey</option>
                        <option value='Profane Content'>Profane Content</option>
                        <option value='Pshychology/Psychiatry'>Pshychology/Psychiatry</option>
                        <option value='Radio'>Radio</option>
                        <option value='Real Estate'>Real Estate</option>
                        <option value='Religion & Spirituality'>Religion & Spirituality</option>
                        <option value='Remodelling & Construction'>Remodelling & Construction</option>
                        <option value='Reptiles'>Reptiles</option>
                        <option value='Resume Writing/Advice'>Resume Writing/Advice</option>
                        <option value='Retirement Planning'>Retirement Planning</option>
                        <option value='Road-Side Assistance'>Road-Side Assistance</option>
                        <option value='Rodeo'>Rodeo</option>
                        <option value='Roleplaying Games'>Roleplaying Games</option>
                        <option value='Rugby'>Rugby</option>
                        <option value='Running/Jogging'>Running/Jogging</option>
                        <option value='Sailing'>Sailing</option>
                        <option value='Saltwater Fishing'>Saltwater Fishing</option>
                        <option value='Scholarships'>Scholarships</option>
                        <option value='Sci-FI & Fantasy'>Sci-FI & Fantasy</option>
                        <option value='Science'>Science</option>
                        <option value='Scrapbooking'>Scrapbooking</option>
                        <option value='Screenwritting'>Screenwritting</option>
                        <option value='Scuba Diving'>Scuba Diving</option>
                        <option value='Sedan'>Sedan</option>
                        <option value='Senior Living'>Senior Living</option>
                        <option value='Senor Health'>Senor Health</option>
                        <option value='Sexuality'>Sexuality</option>
                        <option value='Shareware/Freeware'>Shareware/Freeware</option>
                        <option value='Shopping'>Shopping</option>
                        <option value='SkateBoarding'>SkateBoarding</option>
                        <option value='Skiing'>Skiing</option>
                        <option value='Sleep Disorders'>Sleep Disorders</option>
                        <option value='Smoking Cessation'>Smoking Cessation</option>
                        <option value='Snowboarding'>Snowboarding</option>
                        <option value='Society'>Society</option>
                        <option value='South America'>South America</option>
                        <option value='Space/Astronomy'>Space/Astronomy</option>
                        <option value='Spas'>Spas</option>
                        <option value='Special Education'>Special Education</option>
                        <option value='Special Needs Kids'>Special Needs Kids</option>
                        <option value='Sports'>Sports</option>
                        <option value='Spyware/Malware'>Spyware/Malware</option>
                        <option value='Stamps & Coins'>Stamps & Coins</option>
                        <option value='Stocks'>Stocks</option>
                        <option value='Studying Business'>Studying Business</option>
                        <option value='Style & Fashion'>Style & Fashion</option>
                        <option value='Substance Abuse'>Substance Abuse</option>
                        <option value='Surfing/Bodyboarding'>Surfing/Bodyboarding</option>
                        <option value='Swimming'>Swimming</option>
                        <option value='Table Tennis/Ping-Pong'>Table Tennis/Ping-Pong</option>
                        <option value='Tax Planning'>Tax Planning</option>
                        <option value='Technology & Computing'>Technology & Computing</option>
                        <option value='Teens'>Teens</option>
                        <option value='Telecommuniting'>Telecommuniting</option>
                        <option value='Television'>Television</option>
                        <option value='Tennis'>Tennis</option>
                        <option value='Theme Park'>Theme Park</option>
                        <option value='Thyroid Disease'>Thyroid Disease</option>
                        <option value='Travel'>Travel</option>
                        <option value='Travelling with Kids'>Travelling with Kids</option>
                        <option value='Trucks and Accessories'>Trucks and Accessories</option>
                        <option value='U.S Government Resources'>U.S Government Resources</option>
                        <option value='U.S Military'>U.S Military</option>
                        <option value='Uncategorized'>Uncategorized</option>
                        <option value='Under Construction'>Under Construction</option>
                        <option value='United Kingdom'>United Kingdom</option>
                        <option value='Unix'>Unix</option>
                        <option value='Vegan'>Vegan</option>
                        <option value='Vegetarian'>Vegetarian</option>
                        <option value='Veterinary Medicine'>Veterinary Medicine</option>
                        <option value='Video & Computer Games'>Video & Computer Games</option>
                        <option value='Vintage Cars'>Vintage Cars</option>
                        <option value='Visual Basic'>Visual Basic</option>
                        <option value='Volleyball'>Volleyball</option>
                        <option value='Wagon'>Wagon</option>
                        <option value='Walking'>Walking</option>
                        <option value='Warez'>Warez</option>
                        <option value='Waterski/Wakeboard'>Waterski/Wakeboard</option>
                        <option value='Weather'>Weather</option>
                        <option value='Web Clip Art'>Web Clip Art</option>
                        <option value='Web Design/HTML'>Web Design/HTML</option>
                        <option value='Web Search'>Web Search</option>
                        <option value='Weddings'>Weddings</option>
                        <option value='Weight Loss'>Weight Loss</option>
                        <option value='Windows'>Windows</option>
                        <option value='Wine'>Wine</option>
                        <option value='Womens Health'>Women's Health</option>
                        <option value='Woodworking'>Woodworking</option>
                        <option value='World Soccer'>World Soccer</option>
                    </select>
                </div>


            </Grid>
            )}
            
            <div class={styles.svdef}>
                <button class="button-footer2" tabIndex="0" type="submit" >Next: Set your Targetting</button>
            </div>
        </div>
    )
}