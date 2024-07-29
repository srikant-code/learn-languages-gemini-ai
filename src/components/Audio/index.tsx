import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import CustomButton from "../Button";
import CustomSelect from "../Select";
import CustomSlider from "../Slider";

const AudioPlayer = ({
  src,
  text,
  voice,
  showVoiceSelector,
  showPlaybackSpeed,
  showStop,
  buttonProps = {},
  ...props
}) => {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setPlaying(false);
    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (src) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      if (playing) {
        window.speechSynthesis.cancel();
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speed;
        utterance.voice = window.speechSynthesis
          .getVoices()
          .find((v) => v.name === voice);
        utterance.onend = () => setPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
    setPlaying(!playing);
  };

  const stop = () => {
    if (src) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event);
    if (src) {
      audioRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="flex flex-row gap-2 ">
      {showVoiceSelector && <VoiceSelector />}
      {src && <audio ref={audioRef} src={src} {...props} />}
      <CustomButton isIconOnly onClick={togglePlayPause} {...buttonProps}>
        {playing ? <FaPause /> : <FaPlay />}
      </CustomButton>
      {showStop && (
        <CustomButton isIconOnly onClick={stop} {...buttonProps}>
          <FaStop />
        </CustomButton>
      )}
      {showPlaybackSpeed && (
        <CustomSlider
          label="Playback speed"
          value={speed} // Assuming you have a state for this
          onChange={handleSpeedChange}
        />
      )}
    </div>
  );
};

const VoiceSelector = ({ userCountry = "", userLanguage = "" }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(userCountry);
  const [selectedLanguage, setSelectedLanguage] = useState(userLanguage);

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }
  }, []);

  useEffect(() => {
    const defaultVoice = voices.find(
      (voice) =>
        voice.lang.startsWith(selectedLanguage) ||
        voice.lang.endsWith(selectedCountry)
    );
    if (defaultVoice) {
      setSelectedVoice(defaultVoice.name);
    }
  }, [voices, selectedCountry, selectedLanguage]);

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredVoices = voices.filter((voice) => {
    const val =
      voice.lang.startsWith(selectedLanguage) ||
      voice.lang.endsWith(selectedCountry);
    return { label: val, value: val };
  });

  const countries = [
    ...new Set(
      voices.map((voice) => {
        const value = voice.lang.split("-")[1];
        return { value, label: value };
      })
    ),
  ];
  const languages = [
    ...new Set(
      voices.map((voice) => {
        const value = voice.lang.split("-")[0];
        return { value, label: value };
      })
    ),
  ];
  const className = "w-full min-w-64";

  return (
    <div className="flex flex-col gap-4">
      <CustomSelect
        ariaLabel="country-selector"
        label="Select Country"
        // id="country-selector"
        className={className}
        value={selectedCountry} // Assuming you have a state for this
        onChange={handleCountryChange}
        options={countries}
      />

      <CustomSelect
        ariaLabel="language-selector"
        label="Select Language"
        // id="language-selector"
        className={className}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        options={languages}
      />

      <CustomSelect
        ariaLabel="voice-selector"
        label="Select Voice"
        // id="voice-selector"
        className={className}
        value={selectedVoice}
        onChange={handleVoiceChange}
        options={filteredVoices}
        optionLabelExtractor={(voice) => voice.name} // Assuming filteredVoices is an array of objects with a 'name' property
      />
    </div>
  );
};

export { AudioPlayer, VoiceSelector };

// Can you give a working code with useEffect to get the voices and option to select the voice?
// Can I split this list into male and female and old person or childish categories instead of showing all 180 voices in one single select?
// If I take the user's current country then can I utilize the lang property to make the list smaller right? Give me the code for it, you can split the lang: fr-CA and if user provides either of fr or CA then it should be by default selected, and based on the selection the 2nd select values will be filtered.
// showing input field is bad, Just process the voices and create a map of countries and languages and make the input fields as selection list instead.
