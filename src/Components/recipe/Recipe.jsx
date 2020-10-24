import React, { useEffect, useState } from "react";

const Recipe = (props) => {
      return (
            <div>
                  <button onClick={e => console.log('propppsss', props.location)}>ASSADSAASDASDASD</button>
                  {console.log('weHAVEPROPPPSS', props.location)}

            </div>
      )
}

export default Recipe;

