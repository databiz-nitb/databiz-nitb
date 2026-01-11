import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactCard from '../../components/ContactCard/ContactCard';

const SponsorUs: React.FC = () => {
  // Google Drive PDF URL - Replace with your actual PDF link
  const pdfUrl = 'https://drive.google.com/file/d/1NefJk_rRlJCi6ur0IF0yG_sZ7TYSUove/preview';

  // Download function
  const downloadBrochure = () => {
    // PASTE YOUR GOOGLE DRIVE LINK HERE
    const driveUrl = 'https://drive.google.com/file/d/1NefJk_rRlJCi6ur0IF0yG_sZ7TYSUove/view?usp=sharing';

    try {
      // Convert Google Drive view link to direct download link
      const fileId = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'DataBiz_Brochure.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(driveUrl, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
      window.open(driveUrl, '_blank');
    }
  };


  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Sponsor Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Discover partnership opportunities with DataBiz. Our sponsorship brochure showcases the benefits and impact of supporting our community.
          </p>
        </div>
      </div>

      {/* PDF Viewer Section */}
      <div className="container mx-auto px-4 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Download Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={downloadBrochure}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Download size={20} />
              Download Brochure
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={pdfUrl}
              className="w-full h-[800px] border-0"
              title="DataBiz Sponsorship Brochure"
              allowFullScreen
            />
          </div>


          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Partner with DataBiz?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join leading organizations that support our mission to empower the next generation of data scientists and analysts.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get in Touch
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactCard />
    </div>
  );
};

export default SponsorUs;