class Voter < ActiveRecord::Base
  has_many :votes, dependent: :destroy
  has_many :candidates, through: :votes
end
