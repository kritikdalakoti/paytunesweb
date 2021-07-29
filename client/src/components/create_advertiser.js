import React,{useState} from 'react'
import {Paper,Select, MenuItem  ,Radio,TextField,FormControlLabel, RadioGroup,Snackbar,makeStyles,InputLabel } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import styles from '../css/create_advertiser.module.css'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '90%',
		'& > * + *': {
			marginTop: theme.spacing(5)
		}
	}
}));



export default function Advertiser_Create(){
  const classes=useStyles()
    const [name,setName]=useState('')
    const [success,setsuccess]=useState('')
    const [error,seterror]=useState('')
    const [domain,setDomain]=useState('')
    const [active,setActive]=useState('')
    const [category,setCategory]=useState('')
    const [activeyes,setactiveyes]=useState('No')
    const [activeno,setactiveno]=useState('No')
    const [open,setOpen]=useState(false)
    const history=useHistory()

  const handleChange=(event)=>{
    setCategory(event.target.value)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
console.log('active',active)
  function create_advertiser(){
    fetch('/advertiser/create_advertiser',{  //http://127.0.0.1:5000
      method:'POST',
      headers:{"Content-Type":"application/json","Authorization" :"Bearer "+localStorage.getItem("jwt")},
      
      body:JSON.stringify({
        name,domain,active,category
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        seterror(data.error)
        console.log(data.error)
      }else{
        setsuccess('Created Successfuly!')
        setOpen(true)
        history.push('/advertisers')
        console.log(data)
      }
    })
  }


    return(
        <Paper id="rcorners2"  className='dashboard' elevation={3}>
              <div className={classes.root}>
              {success ? (
					<Alert
						onClose={() => {
							setsuccess('');
						}}
						style={{ margin: '3%' }}
						severity="success"
					>
						{success}
					</Alert>
				) : (
					<React.Fragment />
				)}
				{error ? (
					<Alert
						onClose={() => {
							seterror('');
						}}
						style={{ margin: '3%' }}
						severity="error"
					>
						{error}
					</Alert>
				) : (
					''
				)}
              </div>
              <div class={styles.heading} > <h1>Create Advertiser</h1> </div>
              
              <form class={styles.form} onSubmit={(e)=>{
              e.preventDefault() 
                create_advertiser()
              }
               } >
                 <div style={{marginBottom:'20px'}}>
                 <TextField
          required
          id="outlined-required"
          style={{width:"150%"}}
          label="Advertiser Name"
          variant="outlined"
          autoComplete='off'
          onChange={(e)=>setName(e.target.value)}
          //margin="dense"
        />
                 </div>
            
        <div style={{marginBottom:"20px"}}>
        <TextField
          required
          id="outlined-required"
          autoComplete='off'
          label="Domain"
          variant="outlined"
          type="url"
          style={{width:"150%"}}
          onChange={(e)=>setDomain(e.target.value)}
        />
        </div>
        
        <div class={styles.ssd}>
        <span class={styles.svnf1}>Active</span>
        <div class="radio-toolbar1" onChange={(e)=>setActive(e.target.value)} >
        
          <input  type="radio" id="active" name="Active" value="true" /> 
          <label for="active">Yes</label>

          <input type="radio" id="inActive" name="Active" value="false" /> 
          <label for="inActive">No</label>

        </div>
</div>
        <div class={styles.ssd}>
        <label class={styles.svnf2}>Select Category</label>
      
        
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          style={{width:'100%'}}
          // label="Select Category"
          onChange={handleChange}
        >
          <MenuItem value="3-D Graphics">3-D Graphics</MenuItem>
          <MenuItem value='7-12 Education'>7-12 Education</MenuItem>
          <MenuItem value='A.D.D'>A.D.D</MenuItem>
          <MenuItem value='Accessories'>Accessories</MenuItem>
          <MenuItem value='Adoption'>Adoption</MenuItem>
          <MenuItem value='Adult Education'>Adult Education</MenuItem>
          <MenuItem value='Adventure Travel'>Adventure Travel</MenuItem>
          <MenuItem value='Advertising'>Advertising</MenuItem>
          <MenuItem value='Africa'>Africa</MenuItem>
          <MenuItem value='Agriculture'>Agriculture</MenuItem>
          <MenuItem value='AIDS/HIV'>AIDS/HIV</MenuItem>
          <MenuItem value='Air Travel'>Air Travel</MenuItem>
          <MenuItem value='Allergies'>Allergies</MenuItem>
          <MenuItem value='Alternative Medicines'>Alternative Medicines</MenuItem>
          <MenuItem value='Alternative Religions'>Alternative Religions</MenuItem>
          <MenuItem value='American Cuisine'>American Cuisine</MenuItem>
          <MenuItem value='Animation'>Animation</MenuItem>
          <MenuItem value='Antivirus Software'>Antivirus Software</MenuItem>
          <MenuItem value='Appartments'>Appartments</MenuItem>
          <MenuItem value='Appliances'>Appliances</MenuItem>
          <MenuItem value='Aquariams'>Aquariams</MenuItem>
          <MenuItem value='Architects'>Architects</MenuItem>
          <MenuItem value='Art History'>Art History</MenuItem>
          <MenuItem value='Art/Technology'>Art/Technology</MenuItem>
          <MenuItem value='Arthritis'>Arthritis</MenuItem>
          <MenuItem value='Arts & Crafts'>Arts & Crafts</MenuItem>
          <MenuItem value='Arts & Entertainment'>Arts & Entertainment</MenuItem>
          <MenuItem value='Asthama '>Asthama </MenuItem>
          <MenuItem value='Astrology'>Astrology</MenuItem>
          <MenuItem value='Atheism/Agnosticism'>Atheism/Agnosticism</MenuItem>
          <MenuItem value='Australia & New Zealand'>Australia & New Zealand</MenuItem>
          <MenuItem value='Autism/PDD'>Autism/PDD</MenuItem>
          <MenuItem value='Auto Parts'>Auto Parts</MenuItem>
          <MenuItem value='Auto Racing'>Auto Racing</MenuItem>
          <MenuItem value='Auto Repair'>Auto Repair</MenuItem>
          <MenuItem value='Automotive'>Automotive</MenuItem>
          <MenuItem value='Babies & Toddlers'>Babies & Toddlers</MenuItem>
          <MenuItem value='Barbecues & Grilling'>Barbecues & Grilling</MenuItem>
          <MenuItem value='Baseball'>Baseball</MenuItem>
          <MenuItem value='Beadwork'>Beadwork</MenuItem>
          <MenuItem value='Beauty'>Beauty</MenuItem>
          <MenuItem value='Bed & Breakfast'>Bed & Breakfast</MenuItem>
          <MenuItem value='Begginning Investing'>Begginning Investing</MenuItem>
          <MenuItem value='Bicycling'>Bicycling</MenuItem>
          <MenuItem value='Biology'>Biology</MenuItem>
          <MenuItem value='Biotech/Biomedical'>Biotech/Biomedical</MenuItem>
          <MenuItem value='Bipolar Disorder'>Bipolar Disorder</MenuItem>
          <MenuItem value='Birds'>Birds</MenuItem>
          <MenuItem value='Birdwatching'>Birdwatching</MenuItem>
          <MenuItem value='Board Games/ Puzzles'>Board Games/ Puzzles</MenuItem>
          <MenuItem value='Body Art'>Body Art</MenuItem>
          <MenuItem value='Bodybuilding'>Bodybuilding</MenuItem>
          <MenuItem value='Books & Literature'>Books & Literature</MenuItem>
          <MenuItem value='Botany'>Botany</MenuItem>
          <MenuItem value='Boxing'>Boxing</MenuItem>
          <MenuItem value='Brain Tumour'>Brain Tumour</MenuItem>
          <MenuItem value='Buddhism'>Buddhism</MenuItem>
          <MenuItem value='Budget Travel'>Budget Travel</MenuItem>
          <MenuItem value='Bussines'>Bussines</MenuItem>
          <MenuItem value='Business Software'>Business Software</MenuItem>
          <MenuItem value='Business Travel'>Business Travel</MenuItem>
          <MenuItem value='Buying/Selling Cars'>Buying/Selling Cars</MenuItem>
          <MenuItem value='Buying / Selling Homes'>Buying / Selling Homes</MenuItem>
          <MenuItem value='By US Locale'>By US Locale</MenuItem>
          <MenuItem value='C/C++'>C/C++</MenuItem>
          <MenuItem value='Cajun/Creole'>Cajun/Creole</MenuItem>
          <MenuItem value='Cameras & Camorders'>Cameras & Camorders</MenuItem>
          <MenuItem value='Camping '>Camping </MenuItem>
          <MenuItem value='Canada'>Canada</MenuItem>
          <MenuItem value='Cancer'>Cancer</MenuItem>
          <MenuItem value='Candle & Soap making'>Candle & Soap making </MenuItem>
          <MenuItem value='Canoeing/Kayaking'>Canoeing/Kayaking</MenuItem>
          <MenuItem value='Car Culture'>Car Culture</MenuItem>
          <MenuItem value='Card Games'>Card Games</MenuItem>
          <MenuItem value='Career Advice'>Career Advice</MenuItem>
          <MenuItem value='Career Planning'>Career Planning</MenuItem>
          <MenuItem value='Careers'>Careers</MenuItem>
          <MenuItem value='Caribbean'>Caribbean</MenuItem>
          <MenuItem value='Catholicism'>Catholicism</MenuItem>
          <MenuItem value='Cats'>Cats</MenuItem>
          <MenuItem value='Celebrity Fan/Gossip'>Celebrity Fan/Gossip</MenuItem>
          <MenuItem value='Cell Phones'>Cell Phones</MenuItem>
          <MenuItem value='Certified Pre-Owned'>Certified Pre-Owned</MenuItem>
          <MenuItem value='Cheerleading'>Cheerleading</MenuItem>
          <MenuItem value='Chemistry'>Chemistry</MenuItem>
          <MenuItem value='Chess'>Chess</MenuItem>
          <MenuItem value='Chinese Cuisine'>Chinese Cuisine</MenuItem>
          <MenuItem value='Cholesterol'>Cholesterol</MenuItem>
          <MenuItem value='Christianity'>Christianity</MenuItem>
          <MenuItem value='Chronic Fatigue Syndrome'>Chronic Fatigue Syndrome</MenuItem>
          <MenuItem value='Chronic Pain'>Chronic Pain</MenuItem>
          <MenuItem value='Cigars'>Cigars</MenuItem>
          <MenuItem value='Climbing'>Climbing</MenuItem>
          <MenuItem value='Clothing'>Clothing</MenuItem>
          <MenuItem value='Cocktails/Beer'>Cocktails/Beer</MenuItem>
          <MenuItem value='Coffee/Tea'>Coffee/Tea</MenuItem>
          <MenuItem value='Cold & Flu'>Cold & Flu</MenuItem>
          <MenuItem value='Collecting'>Collecting</MenuItem>
          <MenuItem value='College'>College</MenuItem>
          <MenuItem value='College Administration'>College Administration</MenuItem>
          <MenuItem value='College Life'>College Life</MenuItem>
          <MenuItem value='College Books'>College Books</MenuItem>
          <MenuItem value='Commentary'>Commentary</MenuItem>
          <MenuItem value='Comparison'>Comparison</MenuItem>
          <MenuItem value='Computer Certification'>Computer Certification</MenuItem>
          <MenuItem value='Computer Networking'>Computer Networking </MenuItem>
          <MenuItem value='Computer Peripherals'>Computer Peripherals</MenuItem>
          <MenuItem value='Computer Reviews'>Computer Reviews </MenuItem>
          <MenuItem value='Construction'>Construction</MenuItem>
          <MenuItem value='Contests & Freebies'>Contests & Freebies</MenuItem>
          <MenuItem value='Convertible'>Convertible</MenuItem>
          <MenuItem value='Copyright Infringement'>Copyright Infringement</MenuItem>
          <MenuItem value='Coupe'>Coupe</MenuItem>
          <MenuItem value='Couponing'>Couponing</MenuItem>
          <MenuItem value='Credit/Debt & Loans'>Credit/Debt & Loans</MenuItem>
          <MenuItem value='Cricket'>Cricket</MenuItem>
          <MenuItem value='Crossover'>Crossover</MenuItem>
          <MenuItem value='Cruises'>Cruises</MenuItem>
          <MenuItem value='Cuisine-Specific'>Cuisine-Specific</MenuItem>
          <MenuItem value='Data Centers'>Data Centers</MenuItem>
          <MenuItem value='Databases'>Databases</MenuItem>
          <MenuItem value='Dating'>Dating</MenuItem>
          <MenuItem value='Daycare/Pre School'>Daycare/Pre School</MenuItem>
          <MenuItem value='Deafness'>Deafness</MenuItem>
          <MenuItem value='Dental Care'>Dental Care </MenuItem>
          <MenuItem value='Depression'>Depression</MenuItem>
          <MenuItem value='Dermatology'>Dermatology</MenuItem>
          <MenuItem value='Desktop Publishing'>Desktop Publishing</MenuItem>
          <MenuItem value='Desktop Video'>Desktop Video</MenuItem>
          <MenuItem value='Desserts & Baking'>Desserts & Baking</MenuItem>
          <MenuItem value='Diabetes'>Diabetes</MenuItem>
          <MenuItem value='Diesel'>Diesel</MenuItem>
          <MenuItem value='Dining Out'>Dining Out </MenuItem>
          <MenuItem value='Distance Learning'>Distance Learning </MenuItem>
          <MenuItem value='Divorce Support'>Divorce Support</MenuItem>
          <MenuItem value='Dogs'>Dogs</MenuItem>
          <MenuItem value='Drawing/Sketching'>Drawing/Sketching</MenuItem>
          <MenuItem value='Eastern Europe'>Eastern Europe</MenuItem>
          <MenuItem value='Education'>Education</MenuItem>
          <MenuItem value='Eldercare'>Eldercare</MenuItem>
          <MenuItem value='Electric Vehicle'>Electric Vehicle</MenuItem>
          <MenuItem value='Email'>Email</MenuItem>
          <MenuItem value='Engines'>Engines</MenuItem>
          <MenuItem value='English as a 2nd Language'>English as a 2nd Language</MenuItem>
          <MenuItem value='Entertaining'>Entertaining</MenuItem>
          <MenuItem value='Entertainment'>Entertainment</MenuItem>
          <MenuItem value='Environment Safety'>Environment Safety</MenuItem>
          <MenuItem value='Epilepsy'>Epilepsy</MenuItem>
          <MenuItem value='Ethnic Specific'>Ethnic Specific</MenuItem>
          <MenuItem value='Europe'>Europe</MenuItem>
          <MenuItem value='Exercise'>Exercise</MenuItem>
          <MenuItem value='Extreme Graphic/ Explicit Violence'>Extreme Graphic/ Explicit Violence</MenuItem>
          <MenuItem value='Family & Parenting'>Family & Parenting</MenuItem>
          <MenuItem value='Family Internet'>Family Internet</MenuItem>
          <MenuItem value='Fashion'>Fashion</MenuItem>
          <MenuItem value='Figure Skating'>Figure Skating</MenuItem>
          <MenuItem value='Financial Aid'>Financial Aid</MenuItem>
          <MenuItem value='Financial News'>Financial News</MenuItem>
          <MenuItem value='Financial Planning'>Financial Planning</MenuItem>
          <MenuItem value='Fine Art'>Fine Art</MenuItem>
          <MenuItem value='Fly Fishing'>Fly Fishing</MenuItem>
          <MenuItem value='Food & Drink'>Food & Drink</MenuItem>
          <MenuItem value='Food Allergies'>Food Allergies</MenuItem>
          <MenuItem value='Football'>Football</MenuItem>
          <MenuItem value='Forestry'>Forestry</MenuItem>
          <MenuItem value='France'>France</MenuItem>
          <MenuItem value='Freelance Writing'>Freelance Writing</MenuItem>
          <MenuItem value='French Cuisine'>French Cuisine</MenuItem>
          <MenuItem value='Freshwater Fishing'>Freshwater Fishing </MenuItem>
          <MenuItem value='Game & Fish'>Game & Fish</MenuItem>
          <MenuItem value='Gardening'>Gardening </MenuItem>
          <MenuItem value='Gay Life'>Gay Life</MenuItem>
          <MenuItem value='Genealogy'>Genealogy</MenuItem>
          <MenuItem value='Geography'>Geography</MenuItem>
          <MenuItem value='Geology'>Geology</MenuItem>
          <MenuItem value='GERD/Acid Reflux'>GERD/Acid Reflux</MenuItem>
          <MenuItem value='Getting Published'>Getting Published</MenuItem>
          <MenuItem value='Golf'>Golf</MenuItem>
          <MenuItem value='Government'>Government</MenuItem>
          <MenuItem value='Graduate School'>Graduate School</MenuItem>
          <MenuItem value='Graphics Software'>Graphics Software</MenuItem>
          <MenuItem value='Greece'>Greece</MenuItem>
          <MenuItem value='Green Solutions'>Green Solutions</MenuItem>
          <MenuItem value='Guitar'>Guitar</MenuItem>
          <MenuItem value='Hatchback'>Hatchback</MenuItem>
          <MenuItem value='Hate Content'>Hate Content</MenuItem>
          <MenuItem value='Headaches/Migraines'>Headaches/Migraines</MenuItem>
          <MenuItem value='Health & Fitness'>Health & Fitness</MenuItem>
          <MenuItem value='Heart Disease'>Heart Disease</MenuItem>
          <MenuItem value='Hedge Fund'>Hedge Fund</MenuItem>
          <MenuItem value='Herbs for Health'>Herbs for Health</MenuItem>
          <MenuItem value='Hinduism'>Hinduism</MenuItem>
          <MenuItem value='Hobbies & Intersts'>Hobbies & Intersts</MenuItem>
          <MenuItem value='Holistic Healing'>Holistic Healing</MenuItem>
          <MenuItem value='Home & Garden'>Home & Garden</MenuItem>
          <MenuItem value='Home Recording'>Home Recording</MenuItem>
          <MenuItem value='Home Repair'>Home Repair</MenuItem>
          <MenuItem value='Home Theater'>Home Theater</MenuItem>
          <MenuItem value='Home Video/DVD'>Home Video/DVD</MenuItem>
          <MenuItem value='Homeschooling'>Homeschooling</MenuItem>
          <MenuItem value='Homework/Studytips'>Homework/Studytips</MenuItem>
          <MenuItem value='Honeymoons/Getaways'>Honeymoons/Getaways</MenuItem>
          <MenuItem value='Horse Racing'>Horse Racing</MenuItem>
          <MenuItem value='Horses'>Horses</MenuItem>
          <MenuItem value='Hotels'>Hotels</MenuItem>
          <MenuItem value='Human Resources'>Human Resources</MenuItem>
          <MenuItem value='Humor'>Humor</MenuItem>
          <MenuItem value='Hunting/Shooting'>Hunting/Shooting</MenuItem>
          <MenuItem value='Hybrid'>Hybrid</MenuItem>
          <MenuItem value='IBS/Crohns Disease'>IBS/Crohn's Disease</MenuItem>
          <MenuItem value='Illegal Content'>Illegal Content</MenuItem>
          <MenuItem value='Immigration'>Immigration</MenuItem>
          <MenuItem value='Incentivized'>Incentivized</MenuItem>
          <MenuItem value='Incest/Abuse Support'>Incest/Abuse Support</MenuItem>
          <MenuItem value='Incontinence'>Incontinence</MenuItem>
          <MenuItem value='Infertility'>Infertility</MenuItem>
          <MenuItem value='Inline Skating'>Inline Skating</MenuItem>
          <MenuItem value='Insurance'>Insurance</MenuItem>
          <MenuItem value='Interior Decorating'>Interior Decorating</MenuItem>
          <MenuItem value='International News'>International News</MenuItem>
          <MenuItem value='Investing'>Investing</MenuItem>
          <MenuItem value='Investors & Patents'>Investors & Patents</MenuItem>
          <MenuItem value='Islam'>Islam</MenuItem>
          <MenuItem value='Italian Cuisine'>Italian Cuisine</MenuItem>
          <MenuItem value='Italy'>Italy</MenuItem>
          <MenuItem value='Japan'>Japan</MenuItem>
          <MenuItem value='Japanese Cuisine'>Japanese Cuisine</MenuItem>
          <MenuItem value='Java'>Java</MenuItem>
          <MenuItem value='Javascript'>Javascript</MenuItem>
          <MenuItem value='Jewelry'>Jewelry</MenuItem>
          <MenuItem value='Jewelry making'>Jewelry making</MenuItem>
          <MenuItem value='Job Fairs'>Job Fairs</MenuItem>
          <MenuItem value='Job Search'>Job Search</MenuItem>
          <MenuItem value='Judaism'>Judaism</MenuItem>
          <MenuItem value='K-6 Educators'>K-6 Educators</MenuItem>
          <MenuItem value='Landscaping'>Landscaping</MenuItem>
          <MenuItem value='Language Learning'>Language Learning</MenuItem>
          <MenuItem value='Large Animals'>Large Animals</MenuItem>
          <MenuItem value='Latter-Day Saints'>Latter-Day Saints</MenuItem>
          <MenuItem value='Law, Govt & Politics'>Law, Gov't & Politics</MenuItem>
          <MenuItem value='Legal Issues'>Legal Issues</MenuItem>
          <MenuItem value='Local News'>Local News</MenuItem>
          <MenuItem value='Logistics'>Logistics</MenuItem>
          <MenuItem value='Luxury'>Luxury</MenuItem>
          <MenuItem value='Mac Support'>Mac Support</MenuItem>
          <MenuItem value='Magic & Illusion'>Magic & Illusion</MenuItem>
          <MenuItem value='Marketing'>Marketing</MenuItem>
          <MenuItem value='Marriage'>Marriage</MenuItem>
          <MenuItem value='Martial Arts'>Martial Arts</MenuItem>
          <MenuItem value='Mens Health'>Men's Health</MenuItem>
          <MenuItem value='Metals'>Metals</MenuItem>
          <MenuItem value='Mexican Cuisine'>Mexican Cuisine</MenuItem>
          <MenuItem value='Mexico & Central AAmerica'>Mexico & Central AAmerica</MenuItem>
          <MenuItem value='Mini Van'>Mini Van</MenuItem>
          <MenuItem value='Motorcycles'>Motorcycles</MenuItem>
          <MenuItem value='Mountain Biking'>Mountain Biking</MenuItem>
          <MenuItem value='Movies'>Movies</MenuItem>
          <MenuItem value='MP3/MIDI'>MP3/MIDI</MenuItem>
          <MenuItem value='Music'>Music</MenuItem>
          <MenuItem value='Mutual Funds'>Mutual Funds</MenuItem>
          <MenuItem value='NASCAR Racing'>NASCAR Racing</MenuItem>
          <MenuItem value='National News'>National News</MenuItem>
          <MenuItem value='National Parks'>National Parks</MenuItem>
          <MenuItem value='Needlework'>Needlework</MenuItem>
          <MenuItem value='Net Conferencing'>Net Conferencing</MenuItem>
          <MenuItem value='Net For Beginners'>Net For Beginners</MenuItem>
          <MenuItem value='Network Security'>Network Security</MenuItem>
          <MenuItem value='News'>News</MenuItem>
          <MenuItem value='Non Standard Content'>Non Standard Content</MenuItem>
          <MenuItem value='Nursing'>Nursing</MenuItem>
          <MenuItem value='Nutrition'>Nutrition</MenuItem>
          <MenuItem value='Off-Road Vehicles'>Off-Road Vehicles</MenuItem>
          <MenuItem value='Olympics'>Olympics</MenuItem>
          <MenuItem value='Options'>Options</MenuItem>
          <MenuItem value='Orthopedics'>Orthopedics</MenuItem>
          <MenuItem value='Pagan/Wiccan'>Pagan/Wiccan</MenuItem>
          <MenuItem value='Paintball'>Paintball</MenuItem>
          <MenuItem value='Painting'>Painting</MenuItem>
          <MenuItem value='Palmtops/PDAs'>Palmtops/PDAs</MenuItem>
          <MenuItem value='Panic/Anxiety Disorders'>Panic/Anxiety Disorders</MenuItem>
          <MenuItem value='Paranormal Phenomena'>Paranormal Phenomena</MenuItem>
          <MenuItem value='Parenting K-6 kids'>Parenting K-6 kids</MenuItem>
          <MenuItem value='Parenting Teens'>Parenting Teens</MenuItem>
          <MenuItem value='Pc Support'>Pc Support</MenuItem>
          <MenuItem value='Pediatrics'>Pediatrics</MenuItem>
          <MenuItem value='Performance Vehicles'>Performance Vehicles</MenuItem>
          <MenuItem value='Personal Finance'>Personal Finance</MenuItem>
          <MenuItem value='Pets'>Pets</MenuItem>
          <MenuItem value='Photography'>Photography</MenuItem>
          <MenuItem value='Physical Therapy'>Physical Therapy</MenuItem>
          <MenuItem value='Physics'>Physics</MenuItem>
          <MenuItem value='Pickup'>Pickup</MenuItem>
          <MenuItem value='Politics'>Politics</MenuItem>
          <MenuItem value='Pornography'>Pornography</MenuItem>
          <MenuItem value='Portable'>Portable</MenuItem>
          <MenuItem value='Power & Motorcycles'>Power & Motorcycles</MenuItem>
          <MenuItem value='Pregnancy'>Pregnancy</MenuItem>
          <MenuItem value='Private School'>Private School</MenuItem>
          <MenuItem value='Pro Basketball'>Pro Basketball</MenuItem>
          <MenuItem value='Pro Ice Hockey'>Pro Ice Hockey</MenuItem>
          <MenuItem value='Profane Content'>Profane Content</MenuItem>
          <MenuItem value='Pshychology/Psychiatry'>Pshychology/Psychiatry</MenuItem>
          <MenuItem value='Radio'>Radio</MenuItem>
          <MenuItem value='Real Estate'>Real Estate</MenuItem>
          <MenuItem value='Religion & Spirituality'>Religion & Spirituality</MenuItem>
          <MenuItem value='Remodelling & Construction'>Remodelling & Construction</MenuItem>
          <MenuItem value='Reptiles'>Reptiles</MenuItem>
          <MenuItem value='Resume Writing/Advice'>Resume Writing/Advice</MenuItem>
          <MenuItem value='Retirement Planning'>Retirement Planning</MenuItem>
          <MenuItem value='Road-Side Assistance'>Road-Side Assistance</MenuItem>
          <MenuItem value='Rodeo'>Rodeo</MenuItem>
          <MenuItem value='Roleplaying Games'>Roleplaying Games</MenuItem>
          <MenuItem value='Rugby'>Rugby</MenuItem>
          <MenuItem value='Running/Jogging'>Running/Jogging</MenuItem>
          <MenuItem value='Sailing'>Sailing</MenuItem>
          <MenuItem value='Saltwater Fishing'>Saltwater Fishing</MenuItem>
          <MenuItem value='Scholarships'>Scholarships</MenuItem>
          <MenuItem value='Sci-FI & Fantasy'>Sci-FI & Fantasy</MenuItem>
          <MenuItem value='Science'>Science</MenuItem>
          <MenuItem value='Scrapbooking'>Scrapbooking</MenuItem>
          <MenuItem value='Screenwritting'>Screenwritting</MenuItem>
          <MenuItem value='Scuba Diving'>Scuba Diving</MenuItem>
          <MenuItem value='Sedan'>Sedan</MenuItem>
          <MenuItem value='Senior Living'>Senior Living</MenuItem>
          <MenuItem value='Senor Health'>Senor Health</MenuItem>
          <MenuItem value='Sexuality'>Sexuality</MenuItem>
          <MenuItem value='Shareware/Freeware'>Shareware/Freeware</MenuItem>
          <MenuItem value='Shopping'>Shopping</MenuItem>
          <MenuItem value='SkateBoarding'>SkateBoarding</MenuItem>
          <MenuItem value='Skiing'>Skiing</MenuItem>
          <MenuItem value='Sleep Disorders'>Sleep Disorders</MenuItem>
          <MenuItem value='Smoking Cessation'>Smoking Cessation</MenuItem>
          <MenuItem value='Snowboarding'>Snowboarding</MenuItem>
          <MenuItem value='Society'>Society</MenuItem>
          <MenuItem value='South America'>South America</MenuItem>
          <MenuItem value='Space/Astronomy'>Space/Astronomy</MenuItem>
          <MenuItem value='Spas'>Spas</MenuItem>
          <MenuItem value='Special Education'>Special Education</MenuItem>
          <MenuItem value='Special Needs Kids'>Special Needs Kids</MenuItem>
          <MenuItem value='Sports'>Sports</MenuItem>
          <MenuItem value='Spyware/Malware'>Spyware/Malware</MenuItem>
          <MenuItem value='Stamps & Coins'>Stamps & Coins</MenuItem>
          <MenuItem value='Stocks'>Stocks</MenuItem>
          <MenuItem value='Studying Business'>Studying Business</MenuItem>
          <MenuItem value='Style & Fashion'>Style & Fashion</MenuItem>
          <MenuItem value='Substance Abuse'>Substance Abuse</MenuItem>
          <MenuItem value='Surfing/Bodyboarding'>Surfing/Bodyboarding</MenuItem>
          <MenuItem value='Swimming'>Swimming</MenuItem>
          <MenuItem value='Table Tennis/Ping-Pong'>Table Tennis/Ping-Pong</MenuItem>
          <MenuItem value='Tax Planning'>Tax Planning</MenuItem>
          <MenuItem value='Technology & Computing'>Technology & Computing</MenuItem>
          <MenuItem value='Teens'>Teens</MenuItem>
          <MenuItem value='Telecommuniting'>Telecommuniting</MenuItem>
          <MenuItem value='Television'>Television</MenuItem>
          <MenuItem value='Tennis'>Tennis</MenuItem>
          <MenuItem value='Theme Park'>Theme Park</MenuItem>
          <MenuItem value='Thyroid Disease'>Thyroid Disease</MenuItem>
          <MenuItem value='Travel'>Travel</MenuItem>
          <MenuItem value='Travelling with Kids'>Travelling with Kids</MenuItem>
          <MenuItem value='Trucks and Accessories'>Trucks and Accessories</MenuItem>
          <MenuItem value='U.S Government Resources'>U.S Government Resources</MenuItem>
          <MenuItem value='U.S Military'>U.S Military</MenuItem>
          <MenuItem value='Uncategorized'>Uncategorized</MenuItem>
          <MenuItem value='Under Construction'>Under Construction</MenuItem>
          <MenuItem value='United Kingdom'>United Kingdom</MenuItem>
          <MenuItem value='Unix'>Unix</MenuItem>
          <MenuItem value='Vegan'>Vegan</MenuItem>
          <MenuItem value='Vegetarian'>Vegetarian</MenuItem>
          <MenuItem value='Veterinary Medicine'>Veterinary Medicine</MenuItem>
          <MenuItem value='Video & Computer Games'>Video & Computer Games</MenuItem>
          <MenuItem value='Vintage Cars'>Vintage Cars</MenuItem>
          <MenuItem value='Visual Basic'>Visual Basic</MenuItem>
          <MenuItem value='Volleyball'>Volleyball</MenuItem>
          <MenuItem value='Wagon'>Wagon</MenuItem>
          <MenuItem value='Walking'>Walking</MenuItem>
          <MenuItem value='Warez'>Warez</MenuItem>
          <MenuItem value='Waterski/Wakeboard'>Waterski/Wakeboard</MenuItem>
          <MenuItem value='Weather'>Weather</MenuItem>
          <MenuItem value='Web Clip Art'>Web Clip Art</MenuItem>
          <MenuItem value='Web Design/HTML'>Web Design/HTML</MenuItem>
          <MenuItem value='Web Search'>Web Search</MenuItem>
          <MenuItem value='Weddings'>Weddings</MenuItem>
          <MenuItem value='Weight Loss'>Weight Loss</MenuItem>
          <MenuItem value='Windows'>Windows</MenuItem>
          <MenuItem value='Wine'>Wine</MenuItem>
          <MenuItem value='Womens Health'>Women's Health</MenuItem>
          <MenuItem value='Woodworking'>Woodworking</MenuItem>
          <MenuItem value='World Soccer'>World Soccer</MenuItem>
          </Select>

        </div>
        {/* <br/><br/><br/> */}
        
          <button class={styles.button1}>Create Advertiser</button>
        </form>
              
            </Paper>
    )
}