const pastSales = [14955.9321938775, 15964.82123978201, 15600.14990489130, 15344.28083901773, 15011.76309523809, 17139.43991162474, 16083.35019015280, 15368.60635714285, 15299.0944015047, 15029.588782668498, 16639.253650085764, 15555.987100205899, 15569.444665286403, 16490.94393301105, 17324.393372454262, 16497.645388064848, 16336.943804459692, 16050.027434573003, 16816.072007562736, 16545.678158894647, 15957.199475500345, 15383.531895133654, 15347.955447042641, 16639.714628926475, 16060.98440373315, 16250.574627071825, 15869.413304528169, 16173.699266620975, 15601.852533333331, 14754.024284246574, 14159.422105443338, 14431.17103177315, 15405.766676912568, 14752.618611965812, 14708.591984289618, 14896.921404168092, 15657.415776333786, 15812.444508056225, 15496.831847527474, 22464.578928327643, 17005.328688245318, 18953.980262172285, 20935.08901117508, 27415.84898373984, 13828.57059507524, 14679.587323266987, 13948.50856652949, 13985.160065359476, 13603.70199244246, 15822.286849502914, 16155.910204778156, 16558.86970088375, 15085.818752136754, 15947.340322471151, 15133.433808070531, 15273.194775357388, 14624.147680763985, 14802.39377384196, 15666.81136565381, 15281.751243628947, 16495.012741443577, 14771.023579911776, 15815.75046236922, 15358.693933761406, 15063.936692886458, 15458.591587030718, 16771.70060522696, 16403.962050929113, 16188.248222449676, 15708.726439575488, 16311.509698320191,16373.490954498804,15619.97833905285,15547.568464972528,15016.663795118597,16466.69411522634,15838.99766438356,15952.996144168648,16095.416693822131,15440.993174549165,15852.122176271187,14916.236938010898,14505.64736162988,14372.407925749318,15998.653991867162,15078.266717635066,15553.184019008826,15512.856671177267,16527.129011548914,16376.445111486484,15736.832409352759,22080.18430039788,16518.598642140467,18514.347794068643,20028.90772,25513.51012922465,15425.22643551089,15172.381501856227,14240.431552016264,14279.630240922974
]

catalog = {
    'Temperature': {'min': 29.819681, 'max': 81.888695},
    'Fuel_Price': {'min': 2.673506, 'max': 3.997498},
    'MarkDown1': {'min': 0.000000, 'max': 38291.940882},
    'MarkDown2': {'min': 0.000000, 'max': 41791.665558},
    'MarkDown3': {'min': 0.000000, 'max': 56878.896976},
    'MarkDown4': {'min': 0.000000, 'max': 30485.963134},
    'MarkDown5': {'min': 0.000000, 'max': 18692.618358},
    'CPI': {'min': 167.059707, 'max': 176.306335},
    'Unemployment': {'min': 6.940703, 'max': 8.579181},
    'Size': {'min': 135939.205972, 'max': 137675.080027},
}

const generateWeeklyIndicators = (week) => {
    const state = {};
  
    Object.entries(catalog).forEach(([key, value]) => {
      const minVal = value.min;
      const maxVal = value.max;
      state[key] = {
        min: minVal,
        current_state: Math.random() * (maxVal - minVal) + minVal,
        max: maxVal
      };
    });
  
    state['week'] = { current_state: week };
  
    const holidays = ['none', 'super_bowl', 'labor_day', 'thanksgiving', 'christmas'];
    state['is_holiday'] = { current_state: holidays[Math.floor(Math.random() * holidays.length)] };
  
    return state;
  };
  
  const collectUserInput = (state) => {
    const userInput = {};
   
    Object.keys(catalog).forEach((key) => {
      if (state[key]) {
        userInput[key] = parseFloat(state[key].current_state);
      }
    });
  
    userInput['IsHoliday'] = state.is_holiday.current_state !== 'none' ? 1 : 0;
    userInput['Super_Bowl'] = state.is_holiday.current_state === 'super_bowl' ? 1 : 0;
    userInput['Labor_Day'] = state.is_holiday.current_state === 'labor_day' ? 1 : 0;
    userInput['Thanksgiving'] = state.is_holiday.current_state === 'thanksgiving' ? 1 : 0;
    userInput['Christmas'] = state.is_holiday.current_state === 'christmas' ? 1 : 0;
  
    userInput['Weekly_Sales'] = 0; // Dummy value
  
    return userInput;
  };


module.exports = {
    pastSales,
    collectUserInput,
    generateWeeklyIndicators
}