import React, { useState } from 'react';
import { 
  ServiceTypeId, 
  Address, 
  Booking, 
  SelectedVeggie 
} from './types';
import { INITIAL_ADDRESSES, INITIAL_BOOKINGS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VoiceBookingModal } from './components/VoiceBookingModal';
import { HomePage } from './pages/HomePage';
import { ServiceSelectionPage } from './pages/ServiceSelectionPage';
import { BookingFlow } from './pages/BookingFlow';
import { LiveTrackerPage } from './pages/LiveTrackerPage';
import { SessionSummaryPage } from './pages/SessionSummaryPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { BulkEventPage } from './pages/BulkEventPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { ProPortalPage } from './pages/ProPortalPage';
import { VendorPortalPage } from './pages/VendorPortalPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeRole, setActiveRole] = useState<'customer' | 'pro' | 'vendor'>('customer');

  // Address State
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(INITIAL_ADDRESSES[0]);

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeTrackerBooking, setActiveTrackerBooking] = useState<Booking | null>(INITIAL_BOOKINGS[0]);
  const [summaryBooking, setSummaryBooking] = useState<Booking | null>(null);

  // Booking Flow Trigger State
  const [bookingFlowService, setBookingFlowService] = useState<ServiceTypeId>('one-time');
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  // Voice Booking Modal
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleStartBooking = (serviceType: ServiceTypeId) => {
    setBookingFlowService(serviceType);
    setIsBookingFlowOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
    setActiveTrackerBooking(newBooking);
    setIsBookingFlowOpen(false);
    setCurrentTab('tracker');
  };

  const handleSessionFinished = (completedBooking: Booking) => {
    setBookings(bookings.map((b) => (b.id === completedBooking.id ? completedBooking : b)));
    setActiveTrackerBooking(null);
    setSummaryBooking(completedBooking);
    setCurrentTab('summary');
  };

  const handleApplyVoiceVeggies = (parsedVeggies: SelectedVeggie[]) => {
    // Launch booking flow pre-filled with voice veggies
    setBookingFlowService('one-time');
    setIsBookingFlowOpen(true);
  };

  // Check if any booking is currently ongoing
  const hasActiveBooking = bookings.some(
    (b) => b.status === 'PRO_EN_ROUTE' || b.status === 'PRO_ARRIVED' || b.status === 'CUTTING_IN_PROGRESS'
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#1F2937] font-sans">
      
      {/* Sticky Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setIsBookingFlowOpen(false);
        }}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        hasActiveBooking={hasActiveBooking}
        onOpenVoiceBooking={() => setVoiceModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Role: Customer View */}
        {activeRole === 'customer' && (
          <>
            {/* Interactive Booking Wizard Override */}
            {isBookingFlowOpen ? (
              <BookingFlow
                initialServiceType={bookingFlowService}
                selectedAddress={selectedAddress}
                addresses={addresses}
                onBookingConfirmed={handleBookingConfirmed}
                onCancel={() => setIsBookingFlowOpen(false)}
              />
            ) : (
              <>
                {currentTab === 'home' && (
                  <HomePage
                    onStartBooking={handleStartBooking}
                    selectedAddress={selectedAddress}
                    onOpenVoiceBooking={() => setVoiceModalOpen(true)}
                    setCurrentTab={setCurrentTab}
                  />
                )}

                {currentTab === 'services' && (
                  <ServiceSelectionPage
                    onStartBooking={handleStartBooking}
                    setCurrentTab={setCurrentTab}
                  />
                )}

                {currentTab === 'subscriptions' && <SubscriptionsPage />}

                {currentTab === 'bulk' && <BulkEventPage />}

                {currentTab === 'my-bookings' && (
                  <MyBookingsPage
                    bookings={bookings}
                    onTrackBooking={(b) => {
                      setActiveTrackerBooking(b);
                      setCurrentTab('tracker');
                    }}
                    onViewReceipt={(b) => {
                      setSummaryBooking(b);
                      setCurrentTab('summary');
                    }}
                    onRebook={(b) => {
                      handleStartBooking(b.serviceType);
                    }}
                  />
                )}

                {currentTab === 'tracker' && activeTrackerBooking && (
                  <LiveTrackerPage
                    booking={activeTrackerBooking}
                    onSessionFinished={handleSessionFinished}
                  />
                )}

                {currentTab === 'summary' && summaryBooking && (
                  <SessionSummaryPage
                    booking={summaryBooking}
                    onDone={() => setCurrentTab('my-bookings')}
                  />
                )}

                {currentTab === 'profile' && <ProfilePage />}

                {currentTab === 'support' && <HelpSupportPage />}
              </>
            )}
          </>
        )}

        {/* Role: VeggieHands Pro Portal View */}
        {activeRole === 'pro' && <ProPortalPage />}

        {/* Role: Vendor Partner Portal View */}
        {activeRole === 'vendor' && <VendorPortalPage />}
      </main>

      {/* Voice Assistant Modal */}
      <VoiceBookingModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onApplyParsedVeggies={handleApplyVoiceVeggies}
      />

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
