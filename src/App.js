
import './App.css';
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const [investors, setInvestors] = useState([]);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getData = async () =>{
    const response = await fetch('https://youngstartup.io/api/cwebsite/get_speakers_dyn');
    const result = await response.json();
      setInvestors(result.speakers);
    }
    getData()},[]
  );

  const handleClose = () => {
    setOpen(false);
  };


  const renderDetails = (e)=> {
    console.log(e.speaker)
    setDetails(e.speaker);
    setOpen(true);
  }
  const RenderInvestors = ()=>{
    const speakers = investors;
    let renderSpeakers = speakers.map((speaker)=> 
      <div key={speaker.id} className="grid-item" onClick= {()=>{renderDetails({speaker})}}>
        <img src={speaker.speaker_head_shot_to_display} alt={speaker.lastname}></img>          
        <div className='name'>
          {speaker.firstname} {speaker.lastname}
        </div>
        <div className='company'>
          {speaker.company}
        </div>
      </div>
    )
    return renderSpeakers
  }

  
  return (
    <div className="App">
      <h1>MEET OUR 30 FEATURED INVESTORS</h1>
      <div className ="grid-container">
        <RenderInvestors/>
      </div>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" >
            {details.firstname + " " + details.lastname}   
            <br/>         
            {details.company}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img src={details.speaker_head_shot_to_display} alt={details.lastname} className="details"></img>
              <br/>
              {details.bio}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Close</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default App;
