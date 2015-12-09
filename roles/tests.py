from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test.client import Client
from django.test import TestCase

# Create your tests here.
class ProcessAllTest(TestCase):
    def setUp(self):
        self.client = Client()
        


    def test_insert(self):
        data = {'opt': 'insert','key': 'test','content' : 'test'}
        response = self.client.post('/key/',data)
        self.assertEqual(response.status_code, 200)

    def test_selectall(self):
        response = self.client.post('/key/',{'opt':'selectall'})
        self.assertEqual(response.status_code, 200)
        print response.content

    # def test_get_method(self):
    #     self.client.login(username='john', password='johnpassword')
    #     response = self.client.get(reverse('process_all'))
    #     self.assertRedirects(response, '/reports/messages')

    #     # assert no messages were sent

    # def test_post_method(self):
    #     self.client.login(username='john', password='johnpassword')

    #     # add pending messages, mock sms sending?

    #     response = self.client.post(reverse('process_all'))
    #     self.assertRedirects(response, '/reports/messages')