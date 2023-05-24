import React from 'react';
import {
  MDBFooter
} from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>


      <div className='text-center text-white p-3' style={{ backgroundColor: '#0d987d' }}>
        © 2020 Copyright:
        <a className='text-white' href='UniAccomodations'> UniAccomodations
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;