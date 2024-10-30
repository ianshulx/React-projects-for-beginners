import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const ColorPaletteGenerator = () => {
  const [palettes, setPalettes] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);
  const [paletteStates, setPaletteStates] = useState([]);
  const [rotation, setRotation] = useState(Array(8).fill(0)); // Initialize rotation to 0 for all palettes

  const generateRandomMatchingColors = () => {
    const baseColors = [
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
      getRandomColor(),
    ];

    const generatedPalette = baseColors.map((baseColor) => {
      const colorVariations = [
        baseColor,
        shadeColor(baseColor, -20),
        shadeColor(baseColor, 20),
      ];

      return colorVariations;
    });

    setPaletteStates((prevStates) => [...prevStates, true]);
    setPalettes((prevPalettes) => [...prevPalettes, generatedPalette]);
    setRotation((prevRotation) => [...prevRotation, 0]);
  };

  const deletePalette = (index) => {
    const updatedPalettes = [...palettes];
    const updatedStates = [...paletteStates];
    const updatedRotation = [...rotation];
    updatedPalettes.splice(index, 1);
    updatedStates.splice(index, 1);
    updatedRotation.splice(index, 1);
    setPalettes(updatedPalettes);
    setPaletteStates(updatedStates);
    setRotation(updatedRotation);
  };

  const togglePalette = (index) => {
    const updatedStates = [...paletteStates];
    updatedStates[index] = !updatedStates[index];
    setPaletteStates(updatedStates);
    const updatedRotation = [...rotation];
    updatedRotation[index] = updatedStates[index] ? -90 : 0;
    setRotation(updatedRotation);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedColor(text);
      setTimeout(() => {
        setCopiedColor(null);
      }, 2000);
    });
  };

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function shadeColor(color, percent) {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    const newColor = `#${((1 << 24) | (R << 16) | (G << 8) | B)
      .toString(16)
      .slice(1)}`;
    return newColor;
  }

  return (
    <div className="p-8 flex items-center flex-col">
      <nav className="sticky top-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 hover:scale-105 active:scale-90 text-white shadow-xl hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,1)] font-bold py-2 px-4 mb-4 transition-all duration-300"
          onClick={generateRandomMatchingColors}
          type="button"
        >
          Generate 8-Color Palette
        </button>
      </nav>
      {palettes.map((palette, index) => (
        <div key={index} className="mb-8">
          <div className="flex items-center justify-between p-2 w-[100vw] md:w-[50vw]">
            <h2
              className="text-lg font-semibold mb-2 cursor-pointer flex items-center"
              onClick={() => togglePalette(index)}
            >
              <IoIosArrowDropdownCircle
                className="text-2xl mr-2"
                style={{
                  transform: `rotate(${rotation[index]}deg)`,
                  transition: "transform 0.3s ease",
                }}
              />
              Palette {index + 1}{" "}
            </h2>
            <button
              className="text-red-500 hover:underline font-semibold"
              onClick={() => deletePalette(index)}
              type="button"
            >
              Delete Palette
            </button>
          </div>
          <div
            className={`flex flex-wrap items-center justify-around w-full transition-all duration-300 ${
              paletteStates[index] ? "opacity-100 h-auto" : "opacity-0 h-0"
            }`}
          >
            {palette.map((colors, colorIndex) => (
              <div key={colorIndex} className="flex flex-col items-center m-2">
                <div
                  className="w-16 h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: colors[0] }}
                  onClick={() => copyToClipboard(colors[0])}
                />
                <span
                  className="mt-2 cursor-pointer"
                  onClick={() => copyToClipboard(colors[0])}
                >
                  {copiedColor === colors[0] ? "Copied!" : colors[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPaletteGenerator;
