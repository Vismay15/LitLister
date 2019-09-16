import io from 'socket.io-client';
import serverAddress from './middlewares/serverAddress';

export default io.connect(serverAddress);
