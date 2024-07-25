import { Hello } from '@/components/Hello';

export async function generateMetadata(props: { params: { locale: string } }) {

  return {
    title: 'meta_title',
  };
}

const HelloPage = () => (
  <div className="[&_p]:my-6">
    <Hello />
  </div>
);

export default HelloPage;
