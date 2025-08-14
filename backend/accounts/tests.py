import unittest
from accounts.models import Profile

class ProfileUnitTest(unittest.TestCase):
    def test_valid_profile_picture_url(self):
        profile = Profile(profile_picture_url='http://www.www.www')
        self.assertEqual(profile.profile_picture_url, 'http://www.www.www')
    def test_invalid_profile_picture_url(self):
        profile = Profile(profile_picture_url='abv')
        self.assertEqual(profile.profile_picture_url, 'abv')

