import { Helmet } from 'react-helmet-async';
import { Movie } from '@/types/database';

interface SEOHeadProps {
  title?: string;
  description?: string;
  movie?: Movie;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title = 'ფილმები ქართულად - LiderNet',
  description = 'ყურება ფილმები ონლაინ უფასოდ. ყოველდღე ახალი ფილმები, უკეთესი ხარისხი და სურათი.',
  movie,
  canonicalUrl = window.location.href
}) => {
  const siteTitle = 'LiderNet - ფილმები ქართულად';
  const fullTitle = movie ? `${movie.title} - ${siteTitle}` : title;
  const movieDescription = movie?.description || description;
  
  // Comprehensive Georgian keywords for SEO
  const baseKeywords = [
    'ფილმი', 'filmi', 'ფილმები', 'filmebi', 'ფილმი ქართულად', 'filmi qartulad', 
    'ფილმები ქართულად', 'filmebi qartulad', 'სერიალი', 'seriali', 'სერიალები', 
    'serialebi', 'სერიალი ქართულად', 'seriali qartulad', 'სერიალები ქართულად', 
    'serialebi qartulad', 'ანიმაცია', 'animacia', 'ანიმაციები', 'animaciebi', 
    'ანიმაცია ქართულად', 'animacia qartulad', 'ანიმაციები ქართულად', 
    'animaciebi qartulad', 'ანიმე', 'anime', 'ანიმეები', 'animeebi', 
    'ანიმე ქართულად', 'anime qartulad', 'ანიმეები ქართულად', 'animeebi qartulad', 
    'ქართულად გახმოვანებული ფილმები', 'qartulad gaxmovanebuli filmebi', 
    'ქართულად', 'qartulad', 'ონლაინ ყურება', 'online qureba', 'უფასო ფილმები', 
    'upaso filmebi', 'ფილმების ყურება', 'filmebis qureba', 'საიტი ფილმების', 
    'saiti filmebis', 'ქართული ფილმები', 'qartuli filmebi', 'HD ფილმები', 
    'HD filmebi', '4K ფილმები', '4K filmebi', 'ფილმების საიტი', 'filmebis saiti',
    'ლაივი', 'laivi', 'UFC', 'ufc', 'ბრძოლა', 'brdzola', 'სპორტი', 'sporti',
    'სტრიმინგი', 'streamingi', 'ლაივი სტრიმინგი', 'laivi streamingi'
  ];
  
  const movieKeywords = movie ? [
    movie.title,
    movie.genre,
    movie.country,
    `${movie.title} ქართულად`,
    `${movie.title} ონლაინ`,
    `${movie.title} უფასოდ`,
    `${movie.genre} ფილმები`,
    `${movie.year} ფილმები`,
    ...baseKeywords
  ] : baseKeywords;
  
  const structuredData = movie ? {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "description": movie.description,
    "image": movie.poster_url,
    "dateCreated": movie.year?.toString(),
    "genre": movie.genre,
    "duration": movie.duration,
    "aggregateRating": movie.rating ? {
      "@type": "AggregateRating",
      "ratingValue": movie.rating,
      "bestRating": 10
    } : undefined,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": movie.views
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "url": window.location.origin,
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/browse?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={movieDescription} />
      <meta name="keywords" content={movieKeywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={movieDescription} />
      <meta property="og:image" content={movie?.poster_url || '/placeholder.svg'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={movie ? 'video.movie' : 'website'} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ka_GE" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={movieDescription} />
      <meta name="twitter:image" content={movie?.poster_url || '/placeholder.svg'} />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="LiderNet" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="Georgian" />
      <meta name="geo.region" content="GE" />
      <meta name="geo.placename" content="Georgia" />
      
      {/* Additional movie-specific meta tags */}
      {movie && (
        <>
          <meta property="video:duration" content={movie.duration} />
          <meta property="video:release_date" content={movie.year?.toString()} />
          <meta property="video:genre" content={movie.genre} />
          <meta property="video:country" content={movie.country} />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
