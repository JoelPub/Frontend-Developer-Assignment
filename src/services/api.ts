import type { ApiItem } from '../types';

// const API_URL =
//   'https://apifastmock.com/mock/JrdTXg0nMz2grjyoDqEvisQVLzqaXH2CTrhq3nhs-kBak1RNOiBtAycf9w0RhKwH2eMxeiDZ5gmZJqQmQww02aDMn3gQbHIEaX7akUeS29HT5jhvBhtdiR27ZMPYJ3BVm61HNopqQEntSD_-RCXl_bZIrtb0DyOJ86feeCSkIlX2N8hiC4bIYUGiNm8LX7q081-wFvu3PQAfZ-oInQPxkPAiGK3z16fShOW-ghwradFCRAtepFpipjJCQkK-UaDs95q_2IO6rl930mzz9jYNjwE5RBHPph-RV5_zKqb4nvXTzbMm4B6uYsQB2ZZ9C5osD7V4RCCUjWpQfAqt8k34Xp_-ZoLGR2APOdHih0GcOd2ydilpAgckwjdtcMbHfhcG5Cehexi5rakJRUBrX3msuSflGsn7Ib_BL7F7rbUS2NT34PPAXzhbr3bTAoOJZHMRc2u2kbTNrYSmr5MC9KQQnlOr8FBthnSsS0hueJCU9cCopOjhcCROtDR8_O2PNn_00eOtmwwW7NtbuvHwqFo0HKX2WytvwInMit9jnrpDMSimdcY0tiCAKrphgyUtZx_IgsTCVDBZBhSZsDlxasZUatLPkO9mJpbCFTwSA68Nd1hE42VHXVzw2_lVUNwoL763braevVFvQ6UKZmGTZ7swSlbAYSZdE_cEStFJiP1daSGt90NOmpernvirfccsM0sk8jnRW_CW6xd7rCaUgmRw6aUKqAH5fw86fzWg2LlM8vS3ayH_e9OAXnBYzDRSYsAHfPtz6ZvXzdbkU7QFpx29udycW0zGlcdq-6Bai7lQ3OZ-Hk4YUBNDUkAYfIuE1EsGk4XCRyxq6-uiR70zBu-WC_VPxkwPyDiRTSuUDrnHO4HLZD3sMVzp2ao8p52gzcoKeygoIol5Bm2VCIwrxTYFidH9Ilcw2R_dzx30Kzq6ap7OFUB-Xiq7QRRYStlR0gsMf2RT9mp0RT2_rNsKueyGEuVy14yi1ZGq1c53thuP157PeagtoZtT29ZOceh9GyiR8iSPK-1Wo8U4Lz_kZ08dnn6n_xkY9mbCQxSa7m3SxzIMOOfhf4ZPdNjVkhrb0WNgF-ONWKE_t3F-1QKgRmw_LQ4wijvDvo5ikvR57HU54UIoBt9WF2CUSXiX69I6jeLF5yMtzIFj4eZjJIOYnVq77mjhyW4nGcfHcWVxtemPcnHenXoUZuYzKIFPLhwJLlFOICVrYE4g3KS9QxSDQAak7EnwOg0WyRdHM-C5zA_E4AR6ExL0HP7zccdCdp1wQ4nm1grkONIsT2aq9Xhy0fbZuQbrzzljljrYwfgGRa8m8rfbTIyyma-CwjDU5K5ZrxJEouFSp0pbgVGtizS1yQ6PsQTc9bf68ME-HXJCBGpnnMW5BVFgsXOGBdDTSH7IsH_sl3ZojJG4njhLD-_Pu8eEIE0K7_t_BvpzpBkwAcroq7qSrsyeAp94Lm81WkeuxQLJmUWJoE38QPE4pXkuJ0bl667OkcpgVGJWA5pHstgZoVl35BKPvUZV-OfkO28Bo2MSGYwSfjmYyH34wR_6wk5huyX-JtI8rHjgKT3z_CU1MBJF9n2P7JIUONuhlRJTuJe9j5gbEJBtCMxXuCtDAIPqEoOvcg3YZSxHUCxOVQ';
const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';
export const fetchApiItems = async (): Promise<ApiItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Handle different possible response formats
    const items = Array.isArray(data) ? data : data.data || [];

    // Set price to 0 for FREE (1) and VIEW_ONLY (2) items
    return items.map((item: ApiItem) => ({
      ...item,
      price: item.pricingOption === 1 || item.pricingOption === 2 ? 0 : item.price,
    })) as ApiItem[];
  } catch (error) {
    console.error('Failed to fetch content items:', error);
    throw error;
  }
};
