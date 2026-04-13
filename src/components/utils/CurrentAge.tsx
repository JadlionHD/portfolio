import dayjs from "dayjs";

export default function CurrentAge() {
  const birthday = dayjs("2005-02-13");
  const now = dayjs();
  const age = now.diff(birthday, "year");

  return <>{age} years old</>;
}
