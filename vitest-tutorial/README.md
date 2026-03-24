## Installeren en gebruiken van Vitest

Installeer vitest uitsluitend als dev dependency: 

```bash
npm install vitest -D
```

Wijzig het testscript in package.json naar:

```json
"scripts": {
  "test": "vitest"
}
```

Wanneer je `npm run test` uitvoert, zal Vitest automatisch alle bestanden in de `tests` map zoeken die eindigen op `.test.js` en deze uitvoeren als testbestanden. Met het commando `vitest` wordt de **watch mode** geactiveerd, wat betekent dat Vitest zal blijven draaien en automatisch opnieuw tests zal uitvoeren wanneer je wijzigingen aanbrengt in je testbestanden of de bestanden die je test.

Wil je de test slechts één keer uitvoeren zonder in watch mode te blijven, dan kun je het volgende commando gebruiken: `npx vitest run` of maak een nieuw script met `"test:run": "vitest run"` in package.json en voer dat uit met `npm run test:run`.

## Tests uitvoeren

Voer de tests uit met:

```bash
npm run test
```

Het volgende bericht vertelt je dat er geen testbestanden zijn gevonden. En de map 'tests' wordt automatisch meegenomen in het zoekpatroon. 

```javascript

```Bash 
Error: No test files found. You can change the file name pattern by pressing "p"

include: tests/**/*.test.js
```

## Testbestanden aanmaken

Je kunt een testbestand aanmaken in de `tests` map met de naam `example.test.js` en er wat testcode aan toevoegen:

```javascript
import { expect, test } from 'vitest';

test('1 + 1', () => {
    expect(1 + 1).toBe(2);
});
```

Dit is de kortste notatie voor een test. De `test` functie neemt een beschrijving van de test en een callback functie die de testcode bevat. De `expect` functie wordt gebruikt om beweringen (assertions) te doen over de code die getest wordt. In dit geval beweren we dat 1 + 1 gelijk zou moeten zijn aan 2.

Testen wordt vaak rommelig. `describe` maakt een "suite" (een groep van gerelateerde tests) aan. Je kunt het gebruiken om tests te groeperen en een gezamenlijke setup of teardown voor die tests te voorzien. 

Binnen `describe` kun je `it` gebruiken om individuele tests te definiëren. `it` is een alias (afkorting) voor test. het keyword `test` werkt ook gewoon.

Probeer:
```javascript
import { describe, expect, it } from 'vitest';

describe('Math operations', () => {
    it('should add numbers correctly', () => {
        expect(1 + 1).toBe(2);
    });

    it('should subtract numbers correctly', () => {
        expect(5 - 2).toBe(3);
    });
});
```

## Functies uit andere bestanden testen

Laten we nu wat javascript code uit een ander bestand testen. In de map `js` staat een bestand genaamd `math.js`. Voeg de volgende code toe:

```javascript
/**
 * Returns the sum of a + b
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export function sum(a, b) {
    return a + b;
}

/**
 * Returns the substraction of a - b
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export function subtract(a, b) {
    return a - b;
}
```
Nu kun je deze functies in je testbestand importeren en ze testen

```javascript
import { describe, expect, it } from 'vitest';
import { sum, subtract } from '../js/math.js';

import { describe, expect, it } from 'vitest';
import { sum, subtract } from '../js/math.js';

describe('The Sum function', () => {
    it('testing sum with 2 arguments, positive numbers', () => {
        expect(sum(1, 4)).toBe(5);
    });
    it('testing sum with 2 arguments, negative numbers', () => {
        expect(sum(1, -4)).toBe(-3);
    });
});

describe('The Substract function', () => {
    it('testing substraction with 2 arguments', () => {
        expect(subtract(5, 4)).toBe(1);
    });

    it('testing substraction with 3 arguments', () => {
        expect(subtract(1, 4, 5)).toBe(-8);
    });
});
```

Zoals je kunt zien, wordt de `sum()` methode gebruikt als argument in de `expect()` functie. De `toBe()` methode wordt gebruikt om te controleren of het resultaat van `sum(1, 4)` gelijk is aan 5. 

De test met 3 argumenten faalt omdat de `subtract()` functie slechts 2 argumenten accepteert. Dit kun je in de console zien.

Je kunt de `subtract()` functie aanpassen zodat deze meer dan 2 argumenten aankan als je wilt dat die test slaagt. 
