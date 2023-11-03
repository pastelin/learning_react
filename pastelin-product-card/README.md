## Ejemplo

```
import {ProductImage, ProductTitle, ProductButtons} from 'pastelin-product-cart'
```

```
<ProductCard
	key={product.id}
	product={product}
	initialValues={{
	    count: 4,
		maxCount: 10,
	}}
>
	{/* El siguiente codigo regres un JSX.Element */}
		{({ reset, increaseBy, count, isMaxCountReached }) => (
			<>
				<ProductImage />
				<ProductTitle />
				<ProductButtons />
	    	</>
		)}
</ProductCard>

```
