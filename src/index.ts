const observe = <T extends Object|any[]>(object: T, onChange: (object ?: T) => void) => {
	const handler = {
		get(target: T, property: string | number, receiver: any): any {
			try {
				return new Proxy((<any>target)[property], handler)
			} catch (err) {
				return Reflect.get(target, property, receiver)
			}
		},
		defineProperty(target: T, property: string | number | symbol, descriptor: PropertyDescriptor) {
			onChange(object)
			return Reflect.defineProperty(target, property, descriptor)
		},
		deleteProperty(target: T, property: string | number | symbol) {
			onChange(object)
			return Reflect.deleteProperty(target, property)
		}
	}
	return new Proxy(object, handler)
}

export default observe