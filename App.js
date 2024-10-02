import AuthInputs from './Components/AuthInputs.jsx';
import Header from './Components/Header.jsx';
import Answer from './Components/Answer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <AuthInputs />
        <Answer></Answer>
      </main>
    </>
  );
}
