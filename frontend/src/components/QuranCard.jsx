
import toBanglaNumber from "../utils/EnglishToBanglaNumberConverter";

export default function QuranCard({ data }) {
  return (
    <div className="md:p-5">
      <p className="font-arabic-light">{data.verse_arabic}</p>
      <p className="font-q-bangla">{data.verse_bangla}</p>
      {data.verse_no && (
        <p className="font-q-bangla text-xs md:text-sm">
          [{toBanglaNumber(parseInt(data.verse_no.slice(0, 3)) || 0)} :{" "}
          {toBanglaNumber(parseInt(data.verse_no.slice(3, 6)) || 0)}]
        </p>
      )}
    </div>
  );
}
