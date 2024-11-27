require 'bcrypt'

class TUser < ApplicationRecord
  has_secure_password
  has_many :favorites
  has_many :boughts
end
