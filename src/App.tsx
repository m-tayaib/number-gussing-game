import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [randomNumGen, setRandomNumGen] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const toastOptions: Parameters<typeof toast.info>[1] = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const genNum = Math.floor(Math.random() * 100) + 1;
    setRandomNumGen(genNum);
  };

  const resetGame = () => {
    generateRandomNumber();
    setUserInput("");
    setMessage("");
  };

  const guessNumber = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedInput = parseInt(userInput, 10);

    if (isNaN(parsedInput)) {
      toast.error("Please enter a valid number!", toastOptions);
      setMessage("");
      setUserInput("");
      return;
    }
    if (parsedInput < 1 || parsedInput > 100) {
      toast.error("Please enter a number between 1 and 100!", toastOptions);
      setMessage("");
      setUserInput("");
      return;
    }
    if (parsedInput > randomNumGen) {
      toast.info("Try again!", toastOptions);
      setMessage("Your guess is too high!");
    } else if (parsedInput < randomNumGen) {
      toast.info("Try again!", toastOptions);
      setMessage("Your guess is too low!");
    } else {
      toast.success("Congratulations!", toastOptions);
      setMessage("You won! Your number matches!");
      setUserInput("");
    }
  };

  return (
    <section className="h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto mt-20 space-y-10 flex h-screen flex-col items-center justify-start px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold">
          Guessing Game!
        </h1>
        <button
          onClick={resetGame}
          className="bg-fuchsia-400 px-4 py-2 text-xl sm:text-2xl md:text-3xl rounded-md shadow-md hover:bg-fuchsia-600 transition-colors duration-300 ease-in-out cursor-pointer text-white font-bold"
        >
          Start a New Game
        </button>
        <p className="text-xl sm:text-2xl md:text-3xl font-thin text-center">
          Guess a number between 1 and 100
        </p>
        <form
          onSubmit={guessNumber}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            required
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="number"
            min="1"
            max="100"
            placeholder="Enter your guess"
            className="text-lg sm:text-2xl border-2 border-fuchsia-400 rounded-md px-4 py-2 placeholder:font-thin placeholder:capitalize focus:outline-none w-64"
          />
          <button
            type="submit"
            disabled={!userInput}
            className={`bg-fuchsia-400 py-2 px-4 text-lg sm:text-2xl rounded-md shadow-md transition-colors duration-300 ease-in-out cursor-pointer text-white font-bold w-32 sm:w-auto ${
              !userInput
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-fuchsia-600"
            }`}
          >
            Guess
          </button>
        </form>
        <p className="text-xl sm:text-2xl md:text-3xl font-thin text-center">
          {message}
        </p>
        <ToastContainer />
      </div>
    </section>
  );
}

export default App;
