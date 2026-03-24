# Test the unit shop

In deze technische webshop wordt gewerkt met een *Shopping Cart*. Aan jou de taak om deze te **testen** en waar nodig te **verbeteren**. 

## Taken en requirements

### 1. Add item

- 1.1. Wanneer het product nog niet bestaat in de ShoppingCart wordt de hoeveelheid 1.
- 1.2. Waneer het product al in de winkelmand staat, moet de hoeveelheid met 1 verhoogd worden.
- 1.3. Als er geen `Product` wordt meegegeven, dan moet er een error volgen.

### 2. Decrease quantity
- 2.1. Als de hoeveelheid 1 is, moet dit product verwijderd worden uit de winkelmand.
- 2.2. Als de hoeveelheid groter is dan 1, moet dit product niet verwijderd worden maar moet alleen de hoeveelheid verlaagd worden.
- 2.3. Als er geen product meegegeven wordt, moet er niks gebeuren.
- 2.4. Als er een product meegegeven wordt dat niet in de ShoppingCart zit, moet er een error getoond worden

### 3. Apply discount
- 3.1. De totale prijs moet correct berekend worden
- 3.2. De kortingscode moet correct toegepast worden
- 3.3. De kortingscode moet correct verwijderd worden

De tests kun je vinden in de `tests` folder. 