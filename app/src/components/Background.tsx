type Props = {
  handleClick: (event: React.MouseEvent<SVGElement>) => void;
}

export function Background({ handleClick }: Props) {
  return (
   <rect
     className="background"
     onClick={handleClick}
   />
  );
}
