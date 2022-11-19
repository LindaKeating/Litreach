function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(() => {
    console.log(newClip, 'newClip')
    /* clipboard successfully set */
  }, () => {
    console.log(newClip, 'failed')
    /* clipboard write failed */
  });
}

function convertAttemptsToStars(number) {
  switch(number) {
    case '5':
      return '✖️✖️✖️✖️✖️ \x0A';
    case '4': 
      return '⭐✖️✖️✖️✖️ \x0A';
    case '3': 
      return '⭐⭐✖️✖️✖️ \x0A';
    case '2': 
      return  '⭐⭐⭐✖️✖️ \x0A';
    case '1': 
      return '⭐⭐⭐⭐✖️ \x0A';
    case '0': 
      return '⭐⭐⭐⭐⭐ \x0A';
    default:
      console.log('case default');
  }
}

export { updateClipboard , convertAttemptsToStars };