import Imageslider from '@/components/imageslider';
import Choice from '@/components/choice_section';
import Signup from '@/components/signup_section';
import '../globals.css';

interface Slide {
  url: string;
}

type SlideArray = Slide[];

export default function Home() {
  const slides: SlideArray = [
    { url: '/front_image_3.png' },
    { url: '/front_image_2.jpeg' },
    { url: '/front_image_1.jpg' },
  ];

  const messages: string[] = [
    'Client satisfaction is\nour first priority',
    'Our employees are\ntrained professionals',
    'We deliver all over\nBangladesh',
  ];

  return (
    <main id="top" className="w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950">

      {/* Hero Section */}
      <section className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-10">

        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1600px]
          flex-col overflow-hidden rounded-3xl bg-white shadow-xl
          shadow-slate-200/60 dark:bg-slate-900 dark:shadow-black/20
          lg:flex-row">

          {/* Image Slider */}
          <div className="flex w-full lg:w-[70%] min-h-[380px]
              sm:min-h-[480px] lg:min-h-[750px]">
            <Imageslider messages={messages} slides={slides} />
          </div>

          {/* Signup */}
          <div className="flex w-full items-center justify-center
            bg-white p-4 dark:bg-slate-900
            sm:p-8 lg:w-[30%] lg:p-6">

            <Signup />

          </div>

        </div>
      </section>

      {/* Features */}
      <Choice />

    </main>
  );
}