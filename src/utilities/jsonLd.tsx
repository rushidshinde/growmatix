export default function JsonLd({schema, name}:{schema:string, name:string}) {
  let parsedSchema = null;
  try {
    parsedSchema = JSON.parse(schema);
  } catch (e) {
    console.error('Invalid JSON-LD schema:', e);
  }
  return (
    <>
      <script id={`${name}_Schema`} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(parsedSchema).replace(/</g, '\\u003c')}}></script>
    </>
  );
}