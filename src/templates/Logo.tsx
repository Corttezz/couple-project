import Image from 'next/image';

export const Logo = () => (
  <div className="flex items-center text-xl font-semibold h-10">
      <Image 
        src="/assets/images/logo/withLooveLogo.png" 
        alt="With Love Logo" 
        width={250}
        height={80}
        priority
        quality={100}
      />
  </div>
);
