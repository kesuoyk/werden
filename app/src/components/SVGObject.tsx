interface Props {
  as: string;
  attrs: {};
}

export function SVGObject({ as, attrs }: Props) {
  const TagName = as || 'rect';

  return <TagName {...attrs}></TagName>
}
