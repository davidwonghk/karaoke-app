const os = require('os');

function internal() {
	// Get network interfaces
	const networkInterfaces = os.networkInterfaces();

	// Find the internal IPv4 address (usually starts with 192.168)
	let internalIpAddress;

	for (const interfaceName in networkInterfaces) {
		const interfaceArray = networkInterfaces[interfaceName];
		for (const iface of interfaceArray) {
			// Check for IPv4 and not internal or loopback
			if (iface.family === 'IPv4' && !iface.internal && iface.address.startsWith('192.168')) {
				return iface.address;
			}
		}
	}
	return undefined;
}

module.exports = {internal};
