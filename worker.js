// worker.js
self.onmessage = function(event) {
    const { numFlips, numSimulations } = event.data;
    const threeInARowProbs = [];
    const fourInARowProbs = [];
    const fiveInARowProbs = [];

    for (let i = 1; i <= numSimulations; i++) {
        let threeInARow = 0;
        let fourInARow = 0;
        let fiveInARow = 0;
        for (let j = 0; j < i; j++) {
            const flips = Array.from({ length: numFlips }, () => Math.random() < 0.5 ? 'H' : 'T').join('');
            if (flips.includes('HHH') || flips.includes('TTT')) threeInARow++;
            if (flips.includes('HHHH') || flips.includes('TTTT')) fourInARow++;
            if (flips.includes('HHHHH') || flips.includes('TTTTT')) fiveInARow++;
        }
        threeInARowProbs.push(threeInARow / i);
        fourInARowProbs.push(fourInARow / i);
        fiveInARowProbs.push(fiveInARow / i);
    }
    
    self.postMessage({ threeInARowProbs, fourInARowProbs, fiveInARowProbs });
}
