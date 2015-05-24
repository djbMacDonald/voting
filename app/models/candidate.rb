class Candidate < ActiveRecord::Base
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes
end
