import React from 'react';
import styles from './Recipe.module.css'

function getPourSchedule(recipeName, method, coffee, grams, ratio) {
    const totalWater = ratio * grams;
    const bloom = 3 * grams;
    let pours = [];

    pours.push(bloom);

    if (method === "Plinc") {
        pours.push(totalWater)
    } else if (method === "Aeropress") {
        const bypass = totalWater - 200;
        if (bypass > 0) {
            pours.push(totalWater-bypass)
        } else {
            pours.push(totalWater)
        }
        
        pours.push('Stir 3x')
        pours.push('Remove Air, Close Lid')
        if (bypass > 0) {
            pours.push(`Bypass ${bypass}g`)
        }
    } else {
        pours.push(totalWater * 0.4);

        if (coffee === "Red Catuai Natural" || coffee === "Marsellesa Termico" || coffee === "Anaerobic H15") {
            for (let i = 0; i < 2; i++) {
                const halfs = (totalWater * 0.6) / 2;
                pours.push(pours[pours.length-1]+halfs);
            }
            
        } else if (coffee === "Geisha Red Honey" || coffee === "Pacamara Honey" || coffee === "Pacamara Blackmoon") {
            for (let i = 0; i < 3; i++) {
                const thirds = (totalWater * 0.6) / 3;
                pours.push(pours[pours.length-1]+thirds);
            }
        }
    }
    

    return pours;
}

function seconds2Minutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const Recipe = ({ recipeName, method, coffee, grams, ratio }) => {

    // const [selectedRecipe, setRecipe] = useState(recipeName);
    const pours = getPourSchedule(recipeName, method, coffee, grams, ratio) 
    // console.log(recipeName, method, coffee, grams, ratio, pours);

    return (
        <div>
            <ul className="list-group">
                {pours.map((step, index) => (
                    <li className="list-group-item d-flex justify-content-between" key={index}>
                        <span className={styles.leftContent}>{step}
                        {typeof step === "number" && ('g')}
                        </span>
                        <span className={styles.rightContent}>{seconds2Minutes((index+1)*35)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipe;
