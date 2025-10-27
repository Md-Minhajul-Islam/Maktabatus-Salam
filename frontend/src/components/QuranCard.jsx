

export default function QuranCard( {data} ) {
  return (
    <div>
      <p className="font-arabic-light">{data.verse_arabic}</p>
      <p className="font-q-bangla">{data.verse_bangla}</p>
      {data.verse_no && (
        <p className="font-q-bangla text-xs">
          [{parseInt(data.verse_no.slice(0, 3) || 0)} :{" "}
          {parseInt(data.verse_no.slice(3, 6)) || 0}]
        </p>
      )}
    </div>
  );
}
