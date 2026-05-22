import React from "react";

const WarningIcon = ({ code }) => {
  const code2icon = (code: string) => {
    code = code.toLowerCase();
    switch (true) {
      case /WFIRE(y|r)/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/fire${code.at(-1)}.gif`;
      case /WFROST/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/frost.gif`;
      case /WHOT/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/vhot.gif`;
      case /WCOLD/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/cold.gif`;
      case /WMSGNL/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/sms.gif`;
      case /WFNTSA/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/ntfl.gif`;
      case /WL/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/landslip.gif`;
      case /WRAIN[arb]/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/rain${code.at(-1)}.gif`;
      case /WTCSGNL/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/tc${code.at(-1)}.gif`;
      case /WTMW/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/tsunami-warn.gif`;
      case /WTS/.test(code):
        return `https://www.hko.gov.hk/en/wxinfo/dailywx/images/ts.gif`;
    }
  };
  return <div className="warningIcon">{code}</div>;
};

export default WarningIcon;

/*WFIRE: Fire Danger Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/fire[y|r].gif
WFROST: Frost Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/frost.gif
WHOT: Hot Weather Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/vhot.gif
WCOLD: Cold Weather Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/cold.gif
WMSGNL: Strong Monsoon Signal
https://www.hko.gov.hk/en/wxinfo/dailywx/images/sms.gif
WRAIN: Rainstorm Warning Signal 
https://www.hko.gov.hk/en/wxinfo/dailywx/images/rain[a|r|b].gif
WFNTSA: Special Announcement on Flooding in the northern New Territories
https://www.hko.gov.hk/en/wxinfo/dailywx/images/ntfl.gif
WL: Landslip Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/landslip.gif
WTCSGNL: Tropical Cyclone Warning Signal 
https://www.hko.gov.hk/en/wxinfo/dailywx/images/tc[n].gif
WTMW: Tsunami Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/tsunami-warn.gif
WTS: Thunderstorm Warning
https://www.hko.gov.hk/en/wxinfo/dailywx/images/ts.gif
*/
